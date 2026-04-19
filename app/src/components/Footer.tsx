import EthMark from './EthMark'

export default function Footer() {
  return (
    <footer
      className="footer-pad"
      style={{
        position: 'relative',
        background:
          'linear-gradient(180deg, rgba(236,232,225,0.045) 0%, rgba(236,232,225,0.015) 100%)',
        borderTop: '1px solid rgba(236,232,225,0.12)',
        boxShadow: 'inset 0 1px 0 rgba(236,232,225,0.04)',
      }}
    >
      <div
        className="container-lg"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <EthMark size={20} />
              <span className="font-display" style={{ fontStyle: 'italic', fontSize: 18 }}>
                ETHGlobal Copilot
              </span>
            </div>
            <p className="c-cream-55" style={{ fontSize: 14, lineHeight: 1.6 }}>
              A research copilot for Ethereum builders. MVP — not financial
              advice, not a substitute for shipping.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 48,
              flexWrap: 'wrap',
            }}
          >
            <FooterCol
              title="Product"
              links={[
                { label: 'Try it', href: '#try' },
                { label: 'Examples', href: '#ask' },
              ]}
            />
            <FooterCol
              title="Install"
              links={[
                { label: 'Claude Code', href: '#try' },
                { label: 'GitHub', href: 'https://github.com/ivanvolov/eth-global-copilot' },
              ]}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: '1px solid rgba(236,232,225,0.06)',
          }}
        >
          <span className="font-mono c-cream-30" style={{ fontSize: 11 }}>
            © 2026 · ETHGlobal Copilot · MVP preview
          </span>
          <span className="label-mono c-cream-30" style={{ fontSize: 10 }}>
            Built for Ethereum builders
          </span>
        </div>
      </div>
    </footer>
  )
}

type FooterColProps = {
  title: string
  links: Array<{ label: string; href: string }>
}

function FooterCol({ title, links }: FooterColProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 120 }}>
      <div className="label-mono c-cream-40" style={{ fontSize: 10 }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="c-cream-70 hv-c-cream t-color"
            style={{ fontSize: 14 }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}
