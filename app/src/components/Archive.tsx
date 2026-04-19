import { BookOpen } from 'lucide-react'

const sources = [
  { name: 'EIPs & ERCs', tag: 'Standards' },
  { name: 'Ethereum.org docs', tag: 'Reference' },
  { name: "Vitalik's writings", tag: 'Research' },
  { name: 'Paradigm Research', tag: 'Research' },
  { name: 'a16z crypto', tag: 'Research' },
  { name: 'L2Beat', tag: 'Data' },
  { name: 'Dune dashboards', tag: 'Data' },
  { name: 'OpenZeppelin', tag: 'Libraries' },
  { name: 'Foundry Book', tag: 'Tooling' },
  { name: 'Hardhat docs', tag: 'Tooling' },
  { name: 'Viem / wagmi', tag: 'Tooling' },
  { name: 'ERC-4337 resources', tag: 'AA' },
  { name: 'Safe developer docs', tag: 'AA' },
  { name: 'Uniswap v4 hooks', tag: 'DeFi' },
  { name: 'Aave whitepapers', tag: 'DeFi' },
  { name: 'Chainlink CCIP', tag: 'Oracles' },
  { name: 'Optimism & Base docs', tag: 'L2' },
  { name: 'Arbitrum Orbit', tag: 'L2' },
  { name: 'zkSync, Starknet', tag: 'ZK' },
  { name: 'Risc Zero, Succinct', tag: 'ZK' },
  { name: 'Lens & Farcaster', tag: 'Social' },
  { name: 'ENS technical docs', tag: 'Identity' },
  { name: 'Privy / Dynamic', tag: 'Onboarding' },
  { name: 'The Graph subgraphs', tag: 'Data' },
]

export default function Archive() {
  return (
    <section className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-eth-violet/80">
              Archive library
            </div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              80+ curated sources.
              <br />
              <span className="text-white/50">Constantly growing.</span>
            </h2>
          </div>
          <p className="max-w-md text-white/60">
            Every source is normalized, chunked, and tagged so Copilot can cite
            the exact doc, whitepaper, or repo behind every answer.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {sources.map((s, i) => (
            <div
              key={s.name}
              className="card-hover group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.015] px-4 py-3"
              style={{
                animationDelay: `${i * 0.015}s`,
              }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-white/60 group-hover:bg-white/10 group-hover:text-white">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm text-white/90">{s.name}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/40">
                  {s.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
