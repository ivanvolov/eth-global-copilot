export type Role = 'user' | 'assistant'
export type Message = { role: Role; content: string }

export const suggestedQuestions: string[] = [
  'Show me intents projects shipped at ETHGlobal over the last year',
  'I want to build a gasless gaming onramp — has anyone done this?',
  'Compare AI agent submissions between ETHGlobal Agents and Pragma',
  'Which ETHGlobal projects won EigenLayer bounties?',
]

export const useCases = [
  {
    n: '01',
    title: "Explore what's been built",
    body: 'Every project in a category — teams, stacks, approaches.',
    example: 'Show me social graph projects across Farcaster and Lens at ETHGlobal',
  },
  {
    n: '02',
    title: 'Has it been built?',
    body: "Describe your idea in plain English. See who shipped something close.",
    example: 'I want to build a gasless gaming onramp — has anyone done this?',
  },
  {
    n: '03',
    title: 'Compare across hackathons',
    body: 'Stack events side by side. Where the energy moved, which teams reappeared.',
    example: 'Compare gaming submissions between ETHGlobal NYC and Bangkok',
  },
  {
    n: '04',
    title: "See what's won",
    body: 'Sponsor bounties, grand prizes, finalists — hackathon by hackathon.',
    example: 'Which projects won EigenLayer bounties in the last year?',
  },
  {
    n: '05',
    title: 'Trace ideas to their origins',
    body: 'Follow concepts from whitepapers to live implementations.',
    example: 'How did account abstraction evolve from EIP-86 to 4337 to 7702?',
  },
] as const

const answers: Record<string, string> = {
  'Show me intents projects shipped at ETHGlobal over the last year': `Intents took over most stages through 2024. At ETHGlobal Brussels, the category leaders were anchored in the CowSwap solver architecture — IntentFlow (Brussels winner) used the ERC-7683 draft as its cross-chain settlement format before the spec was final. Sketch (ETHGlobal New York) compiled natural language into sequences of signed intents routed through Uniswap X and Reservoir.

By ETHGlobal Bangkok the pattern consolidated. Teams stopped building new solver networks and started composing on top of Across, Bungee, and Mayan. The interesting submissions moved up the stack — SlipStream handled intent privacy via commit-reveal, and three separate teams shipped variations of "one-click cross-chain DeFi positions."

Worth noting: EIP-7683 (cross-chain intent standard) is the common denominator across most winning submissions. If you're researching the space, the Across team's reference implementation is what most hackers forked.

What angle interests you — the solver side, user-facing abstraction, or privacy on top of intents?`,

  'I want to build a gasless gaming onramp — has anyone done this?': `Plenty of teams have taken runs at this. The cleanest pattern is ERC-4337 bundlers plus a paymaster funded by the game publisher, with session keys so the player signs once per session. GaslessGuild (ETHGlobal Istanbul) did this with Biconomy's paymaster for a turn-based NFT game. At ETHGlobal NYC, MintPass built a similar flow but gated sponsorship on a zk-proof of a prior on-chain action, which kept airdrop farmers out of the subsidy pool.

On Base and Optimism, a few teams have used the Coinbase Smart Wallet plus passkey stack instead of full 4337 — simpler DX, fewer moving parts, but you're coupled to Coinbase's infrastructure. PlayEth (ETHGlobal Brussels) shipped this path end-to-end and won the Base bounty.

The honest trade-offs: sponsoring all gas is expensive, so most teams cap per-user spend daily; dynamic caps (budgets scaled to NFT rarity, session length, etc.) are where the creativity went in 2024. Session keys are also still rough on wallet UIs outside of 4337-native wallets like Safe.

Want to dig into paymaster economics, or the session-key UX side?`,

  'Compare AI agent submissions between ETHGlobal Agents and Pragma': `ETHGlobal Agents (July 2024) was the category's first dedicated event and felt exploratory — most teams wired Claude or GPT-4 to a wallet and a few tools, and winning submissions skewed toward demo-worthy novelty: agents that played on-chain games, agents that negotiated swaps against each other. Standouts were MoneyMind (portfolio allocation across yield strategies) and ChainChat (a Telegram-native agent that bridged funds on user command).

Pragma Bangkok (November 2024) was a different vibe — tighter focus on production-grade infrastructure. The winners weren't "an agent that does X" but rather tooling: better agent toolkits with signed intent execution and constrained tool calling, on-chain agent identity via ERC-6551, and agent-to-agent payment rails on Base. Recall (Pragma finalist) shipped an agent evaluation harness that several sponsors are now piloting.

Pattern across both: teams stopped wrapping LLM calls and started treating the LLM as an unreliable component in a well-designed system. The best Pragma submissions wouldn't have felt out of place at a DevCon talk.

Curious about the agent-infra side, the tooling, or the consumer demos?`,

  'Which ETHGlobal projects won EigenLayer bounties?': `EigenLayer has been a steady presence at ETHGlobal hackathons since their AVS stack stabilized. Notable bounty winners across the last year:

- ETHGlobal New York — zkLayer: an AVS for verifying zk-proofs off-chain with a restaked security guarantee
- ETHGlobal Brussels — RollupRoulette: an AVS that runs consensus for a mini-rollup backed by restaked ETH
- ETHGlobal Singapore — HookGuard: monitors Uniswap v4 hooks for malicious upgrades
- ETHGlobal Bangkok — SafeOracle: a restaked price oracle with slashing tied to published feeds

The pattern: early teams built general trust-outsourcing primitives, and by Bangkok teams were finding niches (cross-rollup, MEV, oracles, DA attestations). The winners read the AVS developer docs deeply and chose problems where restaking actually changed the security argument — not just "we built a thing and plugged EigenLayer in."

The best resource if you're researching: the EigenLayer devnet repo and the middleware contracts library. Want me to dig into a specific winning team's architecture?`,

  'Which projects won EigenLayer bounties in the last year?': `EigenLayer has been a steady presence at ETHGlobal hackathons since their AVS stack stabilized. Notable bounty winners across the last year:

- ETHGlobal New York — zkLayer: an AVS for verifying zk-proofs off-chain with a restaked security guarantee
- ETHGlobal Brussels — RollupRoulette: an AVS that runs consensus for a mini-rollup backed by restaked ETH
- ETHGlobal Singapore — HookGuard: monitors Uniswap v4 hooks for malicious upgrades
- ETHGlobal Bangkok — SafeOracle: a restaked price oracle with slashing tied to published feeds

The pattern: early teams built general trust-outsourcing primitives, and by Bangkok teams were finding niches (cross-rollup, MEV, oracles, DA attestations). The winners read the AVS developer docs deeply and chose problems where restaking actually changed the security argument — not just "we built a thing and plugged EigenLayer in."

Want me to dig into a specific winning team's architecture?`,

  'Show me social graph projects across Farcaster and Lens at ETHGlobal': `Both ecosystems saw steady hackathon submissions through 2024. Farcaster's developer surface is smaller — the protocol is tighter and the Frames API shipped mid-year — so most hackathon projects clustered around Frame-native mini-apps: Yoink on Base, Bountycaster (a community bounty board), and a run of on-chain-game Frames at ETHGlobal Brussels.

Lens had a messier, more experimental spread. At ETHGlobal Istanbul, GraphNet built portable reputation across Lens and Farcaster. At ETHGlobal Bangkok, Lens v2's upgrade to modular follow/collect primitives attracted teams building content monetization on top — PaidPosts, TipJar, and a couple of algorithmic discovery feeds.

Cross-ecosystem submissions are rare but interesting: ETHGlobal NYC's SocialPassport normalized both protocols' graph data into a single attestation format for other dapps to consume.

The honest gap: neither Farcaster nor Lens has a winning pattern for private DMs at the hackathon level — it's still mostly server-side with weak guarantees. If you're poking around this space, that's under-explored.

What layer are you thinking — content, graph, discovery, messaging?`,

  'Compare gaming submissions between ETHGlobal NYC and Bangkok': `NYC (October 2024) was heavy on consumer polish. Rush (on-chain racing game on Base Sepolia, built against Coinbase Smart Wallet) won the gaming track, and three other finalists built variations on "play-in-Frames" via Farcaster. Session keys plus sponsored gas were the table-stakes stack.

Bangkok (November 2024) leaned more toward infrastructure and new primitives. CheckMate built a verifiable chess engine using RISC Zero so on-chain chess could have provably-correct moves without putting the engine on-chain. ArcadeOS came out of Bangkok as well — a gaming-focused L3 on Arbitrum Orbit with per-game sequencers.

Pattern: NYC won on distribution (social + low friction) and Bangkok won on architecture (zk, L3s, new tooling). Same category, different centers of gravity. Teams that shipped at both events — Rush's team returned to Bangkok with a multiplayer v2 — tended to swap their stack mid-stride.

Interested in the distribution side (Farcaster, session keys, onboarding) or the infra side (zk engines, app-chains)?`,

  'How did account abstraction evolve from EIP-86 to 4337 to 7702?': `It started with EIP-86 (2016, Vitalik) as the first sketch of "contract accounts as first-class senders" — never shipped, but seeded the concept of abstraction at the account layer. EIP-2938 (2020) was the serious first proposal for inclusion at the protocol level — bundler-free, transaction-level AA. It stalled because changes to the transaction format and mempool were too invasive for a hard fork.

ERC-4337 (2023) was the pragmatic detour: keep consensus untouched, implement AA as a separate mempool with bundlers, paymasters, and the EntryPoint contract. That's what shipped and got adopted — Safe, Biconomy, Alchemy, and the 4337-native wallets all run on this. Trade-off: real, but the separate-mempool design adds complexity most users never see.

EIP-7702 is a more surgical move: let an EOA delegate its code to a contract for a single transaction. You get most of AA's benefits (batching, sponsored gas, session keys) without changing account type. It's not a replacement for 4337 — it's a way to give every EOA 4337-like superpowers without them switching wallets. Most hackathon teams in 2025 have been shipping hybrid flows: 4337 for power users, 7702 for everyone else.

Want spec-level details on 7702's delegation mechanism, or the ecosystem migration story?`,
}

const fallback = `This is a demo preview with pre-canned sample responses. The real ETHGlobal Copilot is an experimental research skill that installs into Claude Code or Codex and answers against the full ETHGlobal archive and the canonical Ethereum research library.

Try one of the suggested questions above, or click through the "places to start" cards below to see example answers in this demo.`

export function lookupAnswer(question: string): string {
  const key = question.trim()
  return answers[key] ?? fallback
}
