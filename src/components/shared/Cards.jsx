export function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

export function FeatureCard({ title, body }) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  )
}
