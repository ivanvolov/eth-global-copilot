import { MessageSquareQuote } from 'lucide-react'

const questions = [
  {
    q: 'Has my idea been built before?',
    a: 'Pattern-match your concept against every ETHGlobal finalist since 2019 — see who tried, how they framed it, and why it did or didn\'t win.',
    tag: 'Validate',
  },
  {
    q: 'Which sponsors will actually reward this?',
    a: 'Copilot reads sponsor prize criteria and past winners — so you target the $5k bounties where your project is a natural fit.',
    tag: 'Strategize',
  },
  {
    q: 'Who on my team is missing?',
    a: 'Map the skills, repos, and contracts similar winning teams shipped. Find the gap before hacking starts, not at 3am Saturday.',
    tag: 'Staff',
  },
  {
    q: "What's the honest critique of my approach?",
    a: 'Red-team your architecture against known failure modes, deprecated patterns, and adversarial takes from research archives.',
    tag: 'Pressure-test',
  },
  {
    q: 'What are judges tired of seeing?',
    a: 'Surface the tropes — another swap aggregator, another AI agent wrapper — and the thin seams that are actually under-explored.',
    tag: 'Differentiate',
  },
  {
    q: "What's the adjacent ecosystem doing?",
    a: 'See how Solana, Bitcoin L2s, and Cosmos teams have solved the same problem, so your Ethereum-native take is informed, not isolated.',
    tag: 'Scan',
  },
]

export default function Questions() {
  return (
    <section id="questions" className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-eth-violet/80">
            What builders ask
          </div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            The questions you should be
            <br />
            asking <span className="grad-text">before sprint 1.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {questions.map((item) => (
            <article
              key={item.q}
              className="card-hover group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-white/60">
                  {item.tag}
                </span>
                <MessageSquareQuote className="h-4 w-4 text-white/30 transition group-hover:text-eth-violet" />
              </div>
              <h3 className="text-[17px] font-medium leading-snug text-white">
                {item.q}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
