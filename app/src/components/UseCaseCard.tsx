import { ArrowRight, ArrowUpRight } from 'lucide-react'

type Props = {
  n: string
  title: string
  body: string
  example: string
  onTry: (text: string) => void
}

export default function UseCaseCard({ n, title, body, example, onTry }: Props) {
  return (
    <div
      className="group hv-b-gold-40 t-all"
      style={{
        padding: 32,
        border: '1px solid rgba(236,232,225,0.14)',
        borderRadius: 2,
        position: 'relative',
        background:
          'linear-gradient(180deg, rgba(236,232,225,0.055) 0%, rgba(236,232,225,0.02) 100%)',
        boxShadow:
          'inset 0 1px 0 rgba(236,232,225,0.06), 0 24px 48px -32px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <div className="font-mono c-cream-30" style={{ fontSize: 12, letterSpacing: '0.2em' }}>
          {n}
        </div>
        <ArrowUpRight size={16} className="c-cream-20 translate-hover hv-c-gold" />
      </div>
      <h3 className="font-display h-md" style={{ marginBottom: 12, lineHeight: 1.2 }}>
        {title}
      </h3>
      <p className="c-cream-50" style={{ fontSize: 12, lineHeight: 1.55, marginBottom: 16 }}>
        {body}
      </p>
      <button
        onClick={() => {
          onTry(example)
          document.getElementById('try')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="group hv-b-gold-50 t-all"
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '12px 16px',
          borderRadius: 6,
          border: '1px dashed rgba(236,232,225,0.22)',
          background: 'rgba(11,11,12,0.4)',
          cursor: 'pointer',
          color: 'inherit',
        }}
      >
        <div
          className="label-mono c-cream-30"
          style={{
            fontSize: 10,
            marginBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>Try this question</span>
          <ArrowRight size={10} />
        </div>
        <div
          className="font-display c-cream-85"
          style={{ fontStyle: 'italic', fontSize: 15 }}
        >
          &ldquo;{example}&rdquo;
        </div>
      </button>
    </div>
  )
}
