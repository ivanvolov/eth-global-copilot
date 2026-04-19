import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-2.5">
          <Logo className="h-6 w-6" />
          <div className="text-sm text-white/60">
            ETHGlobal Copilot · Built for builders at{' '}
            <span className="text-white">ETHGlobal</span> hackathons.
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-white/50">
          <a href="#" className="hover:text-white">Docs</a>
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">Discord</a>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-7xl px-6 text-xs text-white/30">
        Not affiliated with ETHGlobal. Inspired by the Colosseum Copilot research skill.
      </div>
    </footer>
  )
}
