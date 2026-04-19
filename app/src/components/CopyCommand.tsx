import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export default function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(command)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }}
      className="grad-border group flex items-center gap-3 rounded-full bg-ink-900/80 px-5 py-3 font-mono text-sm text-white/80 backdrop-blur transition hover:text-white"
      aria-label="Copy install command"
    >
      <span className="text-eth-violet">$</span>
      <span>{command}</span>
      <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/5 transition group-hover:bg-white/10">
        {copied ? (
          <Check className="h-3 w-3 text-emerald-400" />
        ) : (
          <Copy className="h-3 w-3 text-white/60" />
        )}
      </span>
    </button>
  )
}
