import { ArrowUpRight } from 'lucide-react'
import EthMark from './EthMark'

export default function Nav() {
  return (
    <nav
      className="nav-bar border-b-faint"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <EthMark size={22} />
        <span className="font-display" style={{ fontStyle: 'italic', fontSize: 20 }}>
          ETHGlobal
        </span>
        <span
          className="label-mono c-cream-40 hide-mobile"
          style={{ marginLeft: 8, fontSize: 10, letterSpacing: '0.2em' }}
        >
          / Copilot
        </span>
      </div>
      <div
        className="hide-mobile"
        style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 14 }}
      >
      </div>
      <a
        href="#try"
        className="group bg-cream c-ink hv-bg-gold t-bg"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 500,
          padding: '8px 16px',
          borderRadius: 9999,
        }}
      >
        Try it
        <ArrowUpRight size={14} className="translate-hover" />
      </a>
    </nav>
  )
}
