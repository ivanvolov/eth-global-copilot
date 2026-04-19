import { useState } from 'react'
import { ArrowRight, Check, Copy, Terminal } from 'lucide-react'
import EthMark from './EthMark'

const INSTALL = 'npx skills add ethglobal/copilot'

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyInstall = () => {
    navigator.clipboard?.writeText(INSTALL)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <header className="header-pad" style={{ position: 'relative' }}>
      <div
        className="float-slow hide-mobile"
        style={{ position: 'absolute', top: 80, right: '6%', opacity: 0.6 }}
      >
        <EthMark size={84} />
      </div>
      <div
        className="spin-slow hide-mobile"
        style={{ position: 'absolute', bottom: 32, left: 32, opacity: 0.3 }}
      >
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <polygon points="70,8 132,70 70,132 8,70" stroke="#ece8e1" strokeWidth="0.5" fill="none" />
          <polygon
            points="70,28 112,70 70,112 28,70"
            stroke="#c8a46b"
            strokeWidth="0.5"
            fill="none"
          />
          <polygon points="70,48 92,70 70,92 48,70" stroke="#ece8e1" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="container-lg" style={{ position: 'relative' }}>
        <div
          className="fade-up"
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}
        >
          <span className="live-dot" />
          <span className="label-mono c-cream-60">Research skill</span>
        </div>

        <h1
          className="font-display h-hero fade-up"
          style={{ marginBottom: 32, animationDelay: '80ms' }}
        >
          Know what's been <br />
          <em className="c-gold">built</em> on Ethereum.
        </h1>

        <p
          className="c-cream-70 fade-up"
          style={{
            maxWidth: 640,
            fontSize: 20,
            lineHeight: 1.6,
            marginBottom: 40,
            animationDelay: '160ms',
          }}
        >
          A research skill for Ethereum builders. Every ETHGlobal hackathon,
          every project, every wild idea shipped over a weekend — searchable,
          right here.
        </p>

        <div
          className="fade-up"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 16,
            marginBottom: 64,
            animationDelay: '220ms',
          }}
        >
          <a
            href="#try"
            className="group bg-cream c-ink hv-bg-gold t-bg"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 9999,
              fontWeight: 500,
            }}
          >
            Try it now
            <ArrowRight size={16} className="arrow-slide" />
          </a>
          <button
            onClick={copyInstall}
            className="group bg-cream-03 hv-bg-cream-06 font-mono t-bg"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 20px',
              borderRadius: 9999,
              border: '1px solid rgba(236,232,225,0.1)',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            <Terminal size={14} className="c-gold" />
            <span className="c-cream-80">{INSTALL}</span>
            {copied ? (
              <Check size={14} className="c-gold" />
            ) : (
              <Copy size={14} className="c-cream-40 hv-c-cream t-color" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
