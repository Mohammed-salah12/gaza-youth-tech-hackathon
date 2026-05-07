export default function PartnerLogoBadge({ logo, alt, name, href, variant, className = '' }) {
  const classes = ['partner-logo-badge', `partner-logo-badge--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  const image = <img className="partner-logo-badge__image" src={logo} alt={alt} />

  if (href) {
    return (
      <a className={classes} href={href} aria-label={`Visit ${name}`}>
        {image}
      </a>
    )
  }

  return <div className={classes}>{image}</div>
}
