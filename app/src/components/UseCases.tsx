import { useCases } from '../data/answers'
import UseCaseCard from './UseCaseCard'

type Props = {
  onTry: (text: string) => void
}

export default function UseCases({ onTry }: Props) {
  return (
    <section id="ask" className="section-pad border-t-faint">
      <div className="container-lg">
        <div className="label-mono c-cream-40" style={{ marginBottom: 16 }}>
          002 · Some places to start
        </div>
        <h2 className="font-display h-xl" style={{ marginBottom: 16, maxWidth: 720 }}>
          Every project, every <em className="c-gold">hackathon</em>, every idea.
        </h2>
        <p className="c-cream-60" style={{ maxWidth: 640, fontSize: 18, marginBottom: 64 }}>
          For builders surveying a category, judges tracking trends, sponsors
          mapping their domain. Tap a question to run it in the chat above.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16,
          }}
        >
          {useCases.map((c) => (
            <UseCaseCard
              key={c.n}
              n={c.n}
              title={c.title}
              body={c.body}
              example={c.example}
              onTry={onTry}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
