import { Boxes, Database, Layers, Tags } from 'lucide-react'

const stats = [
  {
    icon: Boxes,
    value: '10,400+',
    label: 'hackathon projects',
    sub: 'Semantic search across every ETHGlobal submission since 2019.',
    accent: 'from-eth-purple/30 to-transparent',
  },
  {
    icon: Database,
    value: '6,800+',
    label: 'Ethereum products & protocols',
    sub: 'Live index of mainnet and L2 deployments, scored by activity.',
    accent: 'from-eth-blue/30 to-transparent',
  },
  {
    icon: Layers,
    value: '40+',
    label: 'events tracked',
    sub: 'ETHOnline, Paris, Tokyo, Singapore, Bangkok, NYC, Istanbul & more.',
    accent: 'from-eth-cyan/25 to-transparent',
  },
  {
    icon: Tags,
    value: '24',
    label: 'topic clusters',
    sub: 'ZK · AA · L2 · MEV · DeFi · DePIN · Identity · Gaming · Privacy.',
    accent: 'from-eth-pink/25 to-transparent',
  },
]

export default function WhatsInside() {
  return (
    <section id="inside" className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-eth-violet/80">
            What&rsquo;s inside
          </div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            A living index of everything
            <br />
            shipped on Ethereum at hackathons.
          </h2>
          <p className="mt-5 text-white/60 md:text-lg">
            Copilot fuses hackathon archives, protocol docs, research, and
            on-chain data into one searchable context — so your agent knows
            what&rsquo;s been tried, what won, and what&rsquo;s still open.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card-hover relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] p-6"
            >
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl ${s.accent}`}
              />
              <s.icon className="h-5 w-5 text-white/70" />
              <div className="mt-8 font-mono text-4xl font-semibold tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-white/80">{s.label}</div>
              <div className="mt-3 text-[13px] leading-relaxed text-white/50">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
            Events indexed
          </div>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
            <div className="marquee">
              {[...Array(2)].map((_, rep) => (
                <div key={rep} className="flex gap-8 pr-8">
                  {[
                    'ETHOnline 2024',
                    'ETHGlobal Singapore',
                    'ETHGlobal Bangkok',
                    'ETHGlobal Brussels',
                    'ETHGlobal London',
                    'ETHGlobal Istanbul',
                    'ETHGlobal Paris',
                    'ETHGlobal New York',
                    'ETHGlobal Tokyo',
                    'ETHGlobal Waterloo',
                    'ETHDenver',
                    'Scaling Ethereum',
                    'HackFS',
                  ].map((e) => (
                    <span
                      key={`${rep}-${e}`}
                      className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-sm text-white/60"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
