import { ArrowRight, Sparkles } from 'lucide-react'
import CopyCommand from './CopyCommand'
import TerminalDemo from './TerminalDemo'

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-24">
        <div className="flex flex-col items-center text-center">
          <a
            href="#"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70 backdrop-blur transition hover:border-white/25 hover:text-white"
          >
            <Sparkles className="h-3 w-3 text-eth-violet" />
            <span>New · Built for ETHGlobal hackathons</span>
            <ArrowRight className="h-3 w-3 -translate-x-0.5 opacity-60 transition group-hover:translate-x-0" />
          </a>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Know the landscape
            <br />
            <span className="grad-text">before you build.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg text-white/60 md:text-xl">
            ETHGlobal Copilot is a research skill for Claude Code.
            Search thousands of past hackathon projects, winning teams,
            sponsor prizes, and Ethereum ecosystem docs — right from your terminal.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <CopyCommand command="npx claude skills add ethglobal/copilot" />
            <a
              href="#inside"
              className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              Learn more
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs text-white/40">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/60" />
              40+ hackathons indexed
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">10,400+ projects</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Updated weekly</span>
          </div>
        </div>

        <div className="mt-20">
          <TerminalDemo />
        </div>
      </div>
    </section>
  )
}
