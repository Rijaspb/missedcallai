export function SectionLabel({ text }: { text: string }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest mb-4"
      style={{ color: 'var(--color-accent)' }}>
      {text}
    </p>
  )
}