const lines: Array<{ t: string; c: string }> = [
  { t: 'prompt', c: '> Has anyone built an AA paymaster for gasless NFT mints at ETHGlobal?' },
  { t: 'thinking', c: 'Searching 10,482 ETHGlobal projects across 42 events…' },
  { t: 'result', c: '✓ 7 relevant finalists · 2 prize winners · 3 adjacent tools' },
  { t: 'answer', c: '• GaslessGarden (ETHGlobal Istanbul ’23) — ERC-4337 paymaster sponsoring mints' },
  { t: 'answer', c: '• MintMeister (ETHOnline ’24) — Biconomy-based paymaster w/ dynamic limits' },
  { t: 'answer', c: '• zkMintPass (ETHGlobal Singapore ’24) — zk-gated sponsorship, Safe-compatible' },
  { t: 'meta', c: 'Sources: 3 GitHub repos · 5 sponsor pages · Biconomy docs · ERC-4337 spec' },
]

const palette: Record<string, string> = {
  prompt: 'text-white',
  thinking: 'text-white/40 italic',
  result: 'text-eth-cyan',
  answer: 'text-white/80',
  meta: 'text-white/40',
}

export default function TerminalDemo() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-to-br from-eth-purple/20 via-transparent to-eth-cyan/10 blur-2xl" />
      <div className="noise grad-border relative overflow-hidden rounded-2xl bg-ink-900/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="mx-auto font-mono text-xs text-white/40">
            claude code · ethglobal/copilot
          </div>
        </div>
        <div className="space-y-2 px-6 py-6 font-mono text-[13px] leading-relaxed md:text-sm">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`${palette[l.t]} animate-fade-up`}
              style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
            >
              {l.c}
            </div>
          ))}
          <div className="flex items-center gap-2 pt-3 text-white/50">
            <span className="text-eth-violet">▌</span>
          </div>
        </div>
      </div>
    </div>
  )
}
