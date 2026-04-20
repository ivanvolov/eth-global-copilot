#!/usr/bin/env python3
"""Search helpers for the ETHGlobal Copilot skill.

All data lives in ../data/*.json. This CLI reads them on demand and returns
a compact JSON or table for Claude to reason over.

Examples:
    search.py projects -q "account abstraction" --limit 10
    search.py projects --sponsor "Ledger" --has-prize
    search.py projects --event cannes-2026 --has-prize
    search.py events
    search.py sponsors
    search.py show <uuid|slug>
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
PROJECTS_FILE = DATA_DIR / "projects.json"
EVENTS_FILE = DATA_DIR / "events.json"


def load_projects() -> list[dict]:
    with PROJECTS_FILE.open() as f:
        return json.load(f)


def load_events() -> list[dict]:
    with EVENTS_FILE.open() as f:
        return json.load(f)


def project_haystack(p: dict) -> str:
    parts = [
        p.get("name", ""),
        p.get("tagline", ""),
        p.get("description", ""),
        p.get("how_its_made", ""),
    ]
    return " \n ".join(parts).lower()


def match_query(project: dict, terms: list[str]) -> bool:
    if not terms:
        return True
    hay = project_haystack(project)
    return all(t.lower() in hay for t in terms)


def project_summary(p: dict) -> dict:
    return {
        "uuid": p.get("uuid"),
        "slug": p.get("slug"),
        "name": p.get("name"),
        "event_id": p.get("event_id"),
        "tagline": p.get("tagline"),
        "url": p.get("ethglobal_url"),
        "repo": p.get("primary_repository"),
        "prizes": [
            {
                "placement": pr.get("placement"),
                "prize": pr.get("prize"),
                "sponsor": pr.get("sponsor"),
            }
            for pr in (p.get("prizes") or [])
        ],
    }


def cmd_projects(args: argparse.Namespace) -> int:
    projects = load_projects()
    terms = [t for t in (args.query or [])]

    results: list[dict] = []
    sponsor_re = re.compile(args.sponsor, re.I) if args.sponsor else None

    for p in projects:
        if args.event and p.get("event_id") != args.event:
            continue
        if args.has_prize and not p.get("prizes"):
            continue
        if sponsor_re is not None:
            if not any(sponsor_re.search(pr.get("sponsor") or "") for pr in p.get("prizes", [])):
                continue
        if not match_query(p, terms):
            continue
        results.append(p if args.full else project_summary(p))

    results = results[: args.limit] if args.limit else results
    json.dump({"count": len(results), "results": results}, sys.stdout, indent=2, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


def cmd_events(_: argparse.Namespace) -> int:
    events = load_events()
    json.dump({"count": len(events), "results": events}, sys.stdout, indent=2, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


def cmd_sponsors(_: argparse.Namespace) -> int:
    projects = load_projects()
    rows: dict[str, dict] = {}
    for p in projects:
        for pr in p.get("prizes") or []:
            name = pr.get("sponsor") or "Unknown"
            row = rows.setdefault(name, {"sponsor": name, "prize_count": 0, "winners": []})
            row["prize_count"] += 1
            row["winners"].append(
                {
                    "project": p.get("name"),
                    "slug": p.get("slug"),
                    "placement": pr.get("placement"),
                    "prize": pr.get("prize"),
                }
            )
    output = sorted(rows.values(), key=lambda r: r["prize_count"], reverse=True)
    json.dump({"count": len(output), "results": output}, sys.stdout, indent=2, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


def cmd_show(args: argparse.Namespace) -> int:
    projects = load_projects()
    needle = args.ref.lower()
    for p in projects:
        if p.get("uuid") == needle or p.get("slug") == needle:
            json.dump(p, sys.stdout, indent=2, ensure_ascii=False)
            sys.stdout.write("\n")
            return 0
    print(f"no project with uuid/slug '{args.ref}'", file=sys.stderr)
    return 1


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="search.py", description="ETHGlobal Copilot data search.")
    sub = p.add_subparsers(dest="cmd", required=True)

    pr = sub.add_parser("projects", help="Filter project submissions.")
    pr.add_argument("-q", "--query", nargs="*", help="Keywords to AND-match across name/tagline/description/how_its_made.")
    pr.add_argument("--sponsor", help="Regex match on prize sponsor name.")
    pr.add_argument("--has-prize", action="store_true", help="Only projects that won at least one prize.")
    pr.add_argument("--event", help="Filter by event_id (e.g. cannes-2026).")
    pr.add_argument("--limit", type=int, default=20, help="Max results (default 20; 0 = no limit).")
    pr.add_argument("--full", action="store_true", help="Return full records instead of summaries.")
    pr.set_defaults(func=cmd_projects)

    ev = sub.add_parser("events", help="List indexed hackathons.")
    ev.set_defaults(func=cmd_events)

    sp = sub.add_parser("sponsors", help="List sponsors and the projects they awarded.")
    sp.set_defaults(func=cmd_sponsors)

    sh = sub.add_parser("show", help="Show one full project by uuid or slug.")
    sh.add_argument("ref", help="Project uuid or slug.")
    sh.set_defaults(func=cmd_show)

    return p


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
