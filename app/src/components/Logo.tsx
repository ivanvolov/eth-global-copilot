export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#b388ff" />
          <stop offset="1" stopColor="#6cf0ff" />
        </linearGradient>
      </defs>
      <path
        d="M24 4 L38 24 L24 32 L10 24 Z"
        fill="url(#lg)"
        opacity="0.9"
      />
      <path
        d="M24 36 L38 26 L24 44 L10 26 Z"
        fill="url(#lg)"
        opacity="0.5"
      />
    </svg>
  )
}
