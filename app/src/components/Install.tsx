import { Github, ArrowRight } from 'lucide-react'
import CopyCommand from './CopyCommand'

export default function Install() {
  return (
    <section id="install" className="relative border-t border-white/5 py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="relative mx-auto mb-10 h-24 w-24">
          <div className="absolute inset-0 animate-float-slow rounded-full bg-gradient-to-br from-eth-purple to-eth-cyan blur-2xl opacity-70" />
          <div className="relative grid h-full w-full place-items-center rounded-full border border-white/10 bg-ink-900">
            <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
              <defs>
                <linearGradient id="lg2" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#b388ff" />
                  <stop offset="1" stopColor="#6cf0ff" />
                </linearGradient>
              </defs>
              <path d="M24 4 L38 24 L24 32 L10 24 Z" fill="url(#lg2)" opacity="0.9" />
              <path d="M24 36 L38 26 L24 44 L10 26 Z" fill="url(#lg2)" opacity="0.5" />
            </svg>
          </div>
        </div>

        <h2 className="text-balance text-5xl font-semibold tracking-tight md:text-6xl">
          One command.
          <br />
          <span className="grad-text">Every hackathon ever.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/60 md:text-lg">
          Copilot runs as a skill inside Claude Code. It works with whatever
          you already use — Cursor, Windsurf, or plain Claude in the terminal.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <CopyCommand command="npx claude skills add ethglobal/copilot" />
          <div className="flex items-center gap-6 text-sm text-white/50">
            <a className="inline-flex items-center gap-2 hover:text-white" href="#">
              Read the docs <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <span className="text-white/20">·</span>
            <a className="inline-flex items-center gap-2 hover:text-white" href="#">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { k: 'MIT', v: 'Open source' },
            { k: 'Weekly', v: 'Fresh indices' },
            { k: 'Free', v: 'For hackathon builders' },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left"
            >
              <div className="text-xs uppercase tracking-wider text-white/40">{x.v}</div>
              <div className="mt-1 text-lg text-white">{x.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
