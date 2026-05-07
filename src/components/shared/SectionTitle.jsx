export default function SectionTitle({ eyebrow, title, body, inverted = false }) {
  return (
    <div className={`section-title ${inverted ? 'section-title--inverted' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  )
}
