import { Github, Terminal } from 'lucide-react'
import Logo from './Logo'

const links = [
  { label: 'Docs', href: '#install' },
  { label: "What's inside", href: '#inside' },
  { label: 'Questions', href: '#questions' },
  { label: 'Install', href: '#install' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <Logo className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-tight">
            ETHGlobal <span className="text-white/60 font-normal">/ Copilot</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-white/60 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/70 transition hover:border-white/25 hover:text-white sm:flex"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="#install"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink-950 transition hover:bg-white/90"
          >
            <Terminal className="h-3.5 w-3.5" />
            Install
          </a>
        </div>
      </div>
    </header>
  )
}
