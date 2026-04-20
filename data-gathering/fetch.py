"""Fetch & parse ETHGlobal hackathon showcase data via the RSC endpoint.

Subcommands:
  events                     — write events.json (list of all hackathons)
  event <event_slug>         — write {slug}_projects.json (summaries array)
                               and {slug}_projects_detailed.json (details array)
  project <slug> <uuid>      — print one project detail as JSON to stdout (debug)

Cache lives in ./raw (RSC responses only). Consumer-facing output is 2 JSON
files per event at the top level of ./data-gathering.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlencode

HERE = Path(__file__).parent
RAW = HERE / "raw"
RAW.mkdir(exist_ok=True)
(RAW / "projects").mkdir(exist_ok=True)

BASE = "https://ethglobal.com/showcase"
RSC_TOKEN = "1hbrl"

HEADERS = {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "rsc": "1",
    "next-url": "/showcase",
    "priority": "u=1, i",
    "referer": "https://ethglobal.com/showcase",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36"
    ),
}


# ---------- HTTP ----------


def _http_get(url: str) -> str:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8")


def _fetch_with_retry(url: str, label: str) -> str:
    """Exponential backoff, with extra-long waits on 403 (cloudflare)."""
    last_err: Exception | None = None
    for attempt in range(6):
        try:
            return _http_get(url)
        except urllib.error.HTTPError as e:
            last_err = e
            wait = 30 * (attempt + 1) if e.code == 403 else 3 * (attempt + 1)
            print(f"  retry {label} ({e.code}), sleep {wait}s", file=sys.stderr)
            time.sleep(wait)
        except Exception as e:
            last_err = e
            print(f"  retry {label}: {e}", file=sys.stderr)
            time.sleep(3 * (attempt + 1))
    raise RuntimeError(f"failed {label}: {last_err}")


def fetch_showcase_rsc(event_slug: str, page: int) -> str:
    params = {"events": event_slug, "_rsc": RSC_TOKEN}
    if page > 1:
        params = {"events": event_slug, "page": page, "_rsc": RSC_TOKEN}
    url = f"{BASE}?{urlencode(params)}"
    path = RAW / event_slug / f"page{page}.rsc"
    if path.exists() and path.stat().st_size > 1000:
        return path.read_text()
    path.parent.mkdir(exist_ok=True)
    text = _fetch_with_retry(url, f"{event_slug} p{page}")
    path.write_text(text)
    return text


def fetch_project_rsc(slug: str, uuid: str) -> str:
    url = f"{BASE}/{slug}-{uuid}?_rsc={RSC_TOKEN}"
    path = RAW / "projects" / f"{uuid}.rsc"
    if path.exists() and path.stat().st_size > 1000:
        return path.read_text()
    text = _fetch_with_retry(url, f"project {slug}-{uuid}")
    path.write_text(text)
    return text


# ---------- RSC parsing ----------


def _extract_balanced(s: str, start: int, open_c: str, close_c: str) -> str | None:
    depth = 0
    in_str = False
    esc = False
    i = start
    while i < len(s):
        c = s[i]
        if esc:
            esc = False
        elif c == "\\":
            esc = True
        elif c == '"':
            in_str = not in_str
        elif not in_str:
            if c == open_c:
                depth += 1
            elif c == close_c:
                depth -= 1
                if depth == 0:
                    return s[start : i + 1]
        i += 1
    return None


def extract_array(s: str, key: str) -> str | None:
    idx = s.find(f'"{key}":[')
    if idx < 0:
        return None
    return _extract_balanced(s, idx + len(f'"{key}":'), "[", "]")


def extract_object(s: str, key: str) -> str | None:
    idx = s.find(f'"{key}":{{')
    if idx < 0:
        return None
    return _extract_balanced(s, idx + len(f'"{key}":'), "{", "}")


def parse_showcase_page(text: str) -> tuple[list[dict], list[dict]]:
    for line in text.split("\n"):
        if '"projects":[' in line and '"events":[' in line:
            payload = line[line.index(":") + 1 :]
            projects = json.loads(extract_array(payload, "projects") or "[]")
            events = json.loads(extract_array(payload, "events") or "[]")
            return projects, events
    raise ValueError("no showcase payload line")


def build_text_refs(rsc_bytes: bytes) -> dict[str, str]:
    """Map RSC text-payload ids to their decoded strings.

    RSC lines look like `<hex_id>:<type>...`. Text payloads use type `T` with a
    byte-length prefix: `<hex_id>:T<hex_len>,<utf8-bytes of length hex_len>`.
    Crucially, a T body is NOT newline-terminated — the next line id can
    immediately follow, so we can't split by `\\n` and need to walk the stream
    position-by-position.
    """
    refs: dict[str, str] = {}
    pos = 0
    n = len(rsc_bytes)
    hex_chars = set(b"0123456789abcdef")
    while pos < n:
        # every line starts with `<hex_id>:`
        id_end = pos
        while id_end < n and rsc_bytes[id_end] in hex_chars:
            id_end += 1
        if id_end == pos or id_end >= n or rsc_bytes[id_end : id_end + 1] != b":":
            # not a line header — skip to next newline
            nl = rsc_bytes.find(b"\n", pos)
            pos = n if nl < 0 else nl + 1
            continue
        ref_id = rsc_bytes[pos:id_end].decode("ascii")
        type_pos = id_end + 1
        if type_pos >= n:
            break
        tchar = rsc_bytes[type_pos : type_pos + 1]
        if tchar == b"T":
            # read hex length, then comma, then that many bytes
            len_start = type_pos + 1
            len_end = len_start
            while len_end < n and rsc_bytes[len_end] in hex_chars:
                len_end += 1
            if len_end >= n or rsc_bytes[len_end : len_end + 1] != b",":
                nl = rsc_bytes.find(b"\n", pos)
                pos = n if nl < 0 else nl + 1
                continue
            byte_len = int(rsc_bytes[len_start:len_end], 16)
            body_start = len_end + 1
            body_end = body_start + byte_len
            refs[ref_id] = rsc_bytes[body_start:body_end].decode("utf-8", errors="replace")
            pos = body_end
            # consume trailing \n if present
            if pos < n and rsc_bytes[pos : pos + 1] == b"\n":
                pos += 1
        else:
            # other line types (I, F, JSON, etc.) — terminated by newline
            nl = rsc_bytes.find(b"\n", pos)
            pos = n if nl < 0 else nl + 1
    return refs


def _resolve(value, refs: dict[str, str]):
    if isinstance(value, str):
        if len(value) > 1 and value[0] == "$" and all(c in "0123456789abcdef" for c in value[1:]):
            return refs.get(value[1:], value)
        return value
    if isinstance(value, list):
        return [_resolve(v, refs) for v in value]
    if isinstance(value, dict):
        return {k: _resolve(v, refs) for k, v in value.items()}
    return value


def parse_project_detail(text: str) -> dict | None:
    rsc_bytes = text.encode("utf-8")
    refs = build_text_refs(rsc_bytes)
    for line in text.split("\n"):
        if '"project":{"uuid"' in line:
            payload = line[line.index(":") + 1 :]
            obj = extract_object(payload, "project")
            if obj:
                return _resolve(json.loads(obj), refs)
    return None


# ---------- flattening ----------


def _file_url(obj: dict | None) -> str | None:
    if not obj:
        return None
    f = obj.get("file") or {}
    url = f.get("fullUrl")
    return url.split("?")[0] if url else None


def ethglobal_url(slug: str | None, uuid: str | None) -> str | None:
    if not slug or not uuid:
        return None
    return f"https://ethglobal.com/showcase/{slug}-{uuid}"


def flatten_event(e: dict) -> dict:
    return {
        "id": e.get("id"),
        "slug": e.get("slug"),
        "name": e.get("name"),
        "type": e.get("type"),
        "medium": e.get("medium"),
        "status": e.get("status"),
        "start_time": e.get("startTime"),
        "end_time": e.get("endTime"),
        "city": (e.get("city") or {}).get("name") if e.get("city") else None,
    }


def flatten_project_summary(p: dict, event_slug: str) -> dict:
    prizes = [
        (entry.get("prize") or {}).get("name")
        for entry in (p.get("prizes") or [])
        if (entry.get("prize") or {}).get("name")
    ]
    return {
        "uuid": p.get("uuid"),
        "slug": p.get("slug"),
        "name": p.get("name"),
        "tagline": (p.get("tagline") or "").strip(),
        "ethglobal_url": ethglobal_url(p.get("slug"), p.get("uuid")),
        "event_slug": event_slug,
        "event_name": (p.get("event") or {}).get("name"),
        "banner": _file_url(p.get("banner")),
        "prizes": prizes,
    }


def flatten_project_detail(p: dict) -> dict:
    prizes = []
    for entry in p.get("prizes") or []:
        pr = entry.get("prize") or {}
        sponsor = (pr.get("sponsor") or {}).get("name")
        prizes.append(
            {
                "placement": entry.get("name"),
                "prize": pr.get("name"),
                "sponsor": sponsor,
            }
        )

    return {
        "uuid": p.get("uuid"),
        "slug": p.get("slug"),
        "name": p.get("name"),
        "ethglobal_url": ethglobal_url(p.get("slug"), p.get("uuid")),
        "tagline": (p.get("tagline") or "").strip(),
        "description": (p.get("description") or "").strip(),
        "how_its_made": (p.get("howItsMade") or "").strip(),
        "source_code_url": p.get("sourceCodeUrl"),
        "primary_repository": (p.get("primaryRepository") or {}).get("url"),
        "project_url": p.get("url"),
        "prizes": prizes,
    }


# ---------- subcommands ----------


def cmd_events(_args) -> None:
    text = fetch_showcase_rsc("cannes2026", 1)
    _, raw_events = parse_showcase_page(text)
    events = [flatten_event(e) for e in raw_events]
    out = HERE / "events.json"
    out.write_text(json.dumps(events, indent=2))
    print(f"wrote {out} ({len(events)} events)")


def _iter_showcase(event_slug: str):
    page = 1
    while True:
        text = fetch_showcase_rsc(event_slug, page)
        projects, _ = parse_showcase_page(text)
        if not projects:
            return
        for p in projects:
            yield page, p
        page += 1
        if page > 200:
            return


def cmd_event(args) -> None:
    details: list[dict] = []
    failed: list[dict] = []

    raw_projects: list[dict] = []
    pages_seen: set[int] = set()
    for page, p in _iter_showcase(args.event_slug):
        pages_seen.add(page)
        raw_projects.append(p)
    print(f"showcase: {len(raw_projects)} projects across {len(pages_seen)} pages")

    for i, p in enumerate(raw_projects, 1):
        slug, uuid = p.get("slug"), p.get("uuid")
        try:
            text = fetch_project_rsc(slug, uuid)
        except Exception as e:
            print(f"  ! FAILED {slug}-{uuid}: {e}", file=sys.stderr)
            failed.append({"slug": slug, "uuid": uuid, "error": str(e)})
            time.sleep(args.delay * 4)
            continue
        detail = parse_project_detail(text)
        if not detail:
            print(f"  ! no detail parsed for {slug}-{uuid}", file=sys.stderr)
            failed.append({"slug": slug, "uuid": uuid, "error": "parse"})
            continue
        details.append(flatten_project_detail(detail))
        if i % 25 == 0 or i == len(raw_projects):
            print(f"  detail [{i}/{len(raw_projects)}]")
        time.sleep(args.delay)

    out = HERE / f"{args.event_slug}_projects_detailed.json"
    out.write_text(json.dumps(details, indent=2))
    print(f"wrote {out.name} ({len(details)} details)")
    if failed:
        print(f"  ! {len(failed)} failed; first 3: {failed[:3]}")


def cmd_project(args) -> None:
    text = fetch_project_rsc(args.slug, args.uuid)
    detail = parse_project_detail(text)
    if not detail:
        raise SystemExit(f"no project data parsed for {args.slug}-{args.uuid}")
    json.dump(flatten_project_detail(detail), sys.stdout, indent=2)
    print()


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = ap.add_subparsers(dest="cmd", required=True)

    sub.add_parser("events", help="write events.json")

    s = sub.add_parser("event", help="dump 2 arrays (summaries + details) for an event")
    s.add_argument("event_slug")
    s.add_argument("--delay", type=float, default=0.5, help="seconds between requests")

    s = sub.add_parser("project", help="print one project detail (debug)")
    s.add_argument("slug")
    s.add_argument("uuid")

    args = ap.parse_args()
    {
        "events": cmd_events,
        "event": cmd_event,
        "project": cmd_project,
    }[args.cmd](args)


if __name__ == "__main__":
    main()
