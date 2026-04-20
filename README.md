# ETHGlobal Copilot

**Know what's been built on Ethereum.**

A research skill for Ethereum builders. Every ETHGlobal hackathon, every project, every wild idea shipped over a weekend — searchable from Claude Code.

Live preview: https://ivanvolov.github.io/eth-global-copilot/

## What it does

Installed into Claude Code, the skill lets you query the ETHGlobal archive without leaving your terminal. Ask in plain English; Claude pulls the relevant records, names real projects and sponsors, and reasons over the results.

- **Explore what's been built.** Every project in a category — the teams, the stacks, the approaches.
- **Check if it's been built.** Describe your idea; see who shipped something close.
- **Compare across hackathons.** Stack events side by side — where the energy moved, which teams reappeared.
- **See what's won.** Sponsor bounties, grand prizes, finalists, hackathon by hackathon.
- **Trace ideas to their origins.** Follow concepts from whitepapers to live implementations.

Today's index: **ETHGlobal Cannes 2026** — 273 projects, 67 prize winners, 13 sponsors. Scope widens as more events get scraped.

## Repo layout

```
eth-global-copilot/
├── app/                 Vite + React landing page (the preview above).
├── skill/               The Claude Code skill.
│   ├── SKILL.md
│   ├── data/            events.json, projects.json
│   └── scripts/search.py
├── data-gathering/      Scrapers that populate skill/data.
└── .github/workflows/   CI: deploys app/ to GitHub Pages on push to main.
```

## Install the skill

Skills are plain directories — symlink `skill/` into Claude Code's skills folder:

```bash
# per-project (stays with this repo)
mkdir -p .claude/skills
ln -s "$PWD/skill" .claude/skills/ethglobal-copilot

# or globally
mkdir -p ~/.claude/skills
ln -s "$PWD/skill" ~/.claude/skills/ethglobal-copilot
```

Restart Claude Code, then ask something the skill covers — *"Which projects won Ledger bounties at Cannes?"*, *"Show me account abstraction submissions."*, *"Who shipped anything with Chainlink CRE?"*. Claude reads `SKILL.md`, runs `scripts/search.py`, and answers from the results.

## Query the data by hand

`skill/scripts/search.py` is a standalone argparse CLI — useful for debugging the corpus or working without Claude in the loop.

```bash
python3 skill/scripts/search.py --help

python3 skill/scripts/search.py events

# AND-match keywords across name, tagline, description, how_its_made
python3 skill/scripts/search.py projects -q "account abstraction" --limit 10
python3 skill/scripts/search.py projects -q "zero knowledge" --has-prize

# sponsor regex on prizes
python3 skill/scripts/search.py projects --sponsor "Ledger"
python3 skill/scripts/search.py projects --sponsor "Chainlink" --has-prize

# scope by event
python3 skill/scripts/search.py projects --event cannes-2026 --has-prize --limit 50

# sponsor roll-up with winners
python3 skill/scripts/search.py sponsors

# full record by uuid or slug
python3 skill/scripts/search.py show veryclear
```

Default `--limit` is 20 (`--limit 0` removes the cap). Pass `--full` on `projects` for complete records instead of summaries.

## Schemas

**events.json** — one record per hackathon:

| field           | notes                                      |
| --------------- | ------------------------------------------ |
| `id`            | Short slug, used as `event_id` in projects |
| `name`          | Display name                               |
| `year`          | Integer                                    |
| `location`      | Free text                                  |
| `showcase_url`  | ETHGlobal showcase URL                     |
| `project_count` | Informational                              |

**projects.json** — one record per submission:

| field                                    | notes                                                      |
| ---------------------------------------- | ---------------------------------------------------------- |
| `uuid`, `slug`, `name`                   | From ETHGlobal showcase                                    |
| `event_id`                               | FK into `events.json.id`                                   |
| `ethglobal_url`                          | Canonical showcase page                                    |
| `tagline`, `description`, `how_its_made` | Pitch copy + technical write-up                            |
| `primary_repository`, `project_url`      | Links                                                      |
| `prizes`                                 | Array of `{placement, prize, sponsor}`; empty if unwon     |

## Add another hackathon

1. Append a record to `skill/data/events.json`:
   ```json
   { "id": "bangkok-2024", "name": "ETHGlobal Bangkok 2024", "year": 2024, "location": "Bangkok, Thailand", "showcase_url": "...", "project_count": 0 }
   ```
2. Scrape or hand-curate project submissions and append them to `skill/data/projects.json` with `"event_id": "bangkok-2024"`.
3. Update `project_count` on the event.

The Cannes scraper under `data-gathering/` (`fetch.py` + `run.sh`) is the reference — point it at a different event slug and it emits the same schema.

## Landing page

The `app/` directory is a Vite + React site. Canned demo answers live in `app/src/data/answers.ts`.

```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in app/dist
```

CI (`.github/workflows/deploy.yml`) builds `app/` and publishes to GitHub Pages on every push to `main`. Enable once: repo → **Settings → Pages → Source: GitHub Actions**.

## Design notes

- **Progressive disclosure.** `SKILL.md` stays lean (~120 lines). The ~1 MB project corpus only enters context through filtered `search.py` queries. Loading it whole would burn hundreds of KB on data that's irrelevant 95% of the time.
- **JSON, not SQLite.** At ~300 rows it's a rounding error either way. Switch once the corpus crosses ~10k rows or cross-entity joins matter.
- **Reusable CLI, not inline bash.** `search.py` is called both by Claude (via `Bash`) and by humans. `argparse` + `--help` beats retyping Python heredocs.

## License & scope

MVP — not financial advice, not a substitute for shipping.
