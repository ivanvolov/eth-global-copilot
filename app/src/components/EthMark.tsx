export default function EthMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 100 160" fill="none">
      <path d="M50 0 L50 58 L100 80 Z" fill="#ece8e1" opacity="0.65" />
      <path d="M50 0 L0 80 L50 58 Z" fill="#ece8e1" opacity="1" />
      <path d="M50 60 L0 82 L50 108 Z" fill="#ece8e1" opacity="0.8" />
      <path d="M50 60 L100 82 L50 108 Z" fill="#ece8e1" opacity="0.45" />
      <path d="M50 118 L0 92 L50 160 Z" fill="#c8a46b" opacity="0.9" />
      <path d="M50 118 L100 92 L50 160 Z" fill="#c8a46b" opacity="0.6" />
    </svg>
  )
}
