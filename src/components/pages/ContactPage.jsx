import ApplicationForm from '../forms/ApplicationForm'
import HackathonLockup from '../shared/HackathonLockup'
import MediaSlotCard from '../shared/MediaSlotCard'
import SectionTitle from '../shared/SectionTitle'

export default function ContactPage({ content, language, onNavigate, onOpenVideo }) {
  return (
    <>
      <section className="contact-hero">
        <div className="container contact-hero-grid">
          <div className="contact-hero-copy">
            <span className="eyebrow">{content.contactHero.eyebrow}</span>
            <h1>{content.contactHero.title}</h1>
            <p className="hero-text">{content.contactHero.text}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => onNavigate('contact', 'apply')}
              >
                {content.contactHero.primary}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => onNavigate('home')}
              >
                {content.contactHero.secondary}
              </button>
            </div>
          </div>

          <div className="contact-brand-card">
            <HackathonLockup content={content} variant="section" />
            <div className="fact-grid">
              {content.contactHero.facts.map((fact) => (
                <div key={fact.label} className="fact-chip">
                  <strong>{fact.label}</strong>
                  <span>{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container visual-story-layout visual-story-layout--contact">
          <div className="visual-story-copy">
            <SectionTitle
              eyebrow={content.contactMedia.eyebrow}
              title={content.contactMedia.title}
              body={content.contactMedia.body}
            />

            <div className="visual-chip-row">
              {content.contactMedia.notes.map((item) => (
                <span key={item} className="visual-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="media-workbench-grid">
            {content.contactMedia.cards.map((item) => (
              <MediaSlotCard
                key={item.title}
                item={item}
                onOpenVideo={onOpenVideo}
                videoActionLabel={content.mediaModal.openLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container application-hub">
          <aside className="prep-panel">
            <SectionTitle
              eyebrow={content.prep.eyebrow}
              title={content.prep.title}
              body={content.prep.body}
            />

            <article className="prep-card">
              <h3>{content.prep.checklistTitle}</h3>
              <ul className="prep-list">
                {content.prep.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="prep-card">
              <h3>{content.prep.standoutTitle}</h3>
              <ul className="prep-list">
                {content.prep.standout.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="prep-card prep-card--accent">
              <h3>{content.prep.eligibilityTitle}</h3>
              <ul className="prep-list">
                {content.prep.eligibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </aside>

          <div className="application-column">
            <div className="contact-card-list contact-card-list--wide">
              {content.submit.steps.map((step, index) => (
                <article key={step} className="contact-card contact-card--numbered">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </article>
              ))}
            </div>

            <ApplicationForm content={content} language={language} />
          </div>
        </div>
      </section>
    </>
  )
}
