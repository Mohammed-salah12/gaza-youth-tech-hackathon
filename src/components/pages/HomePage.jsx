import { startTransition, useEffect, useMemo, useState } from 'react'
import { techFromPalestineUrl } from '../../config/appConfig'
import { siteImages } from '../../config/siteImages'
import { fetchAroundRoomMedia } from '../../utils/apiClient'
import { FeatureCard, StatCard } from '../shared/Cards'
import HackathonLockup from '../shared/HackathonLockup'
import MediaSlotCard from '../shared/MediaSlotCard'
import PartnerLogoBadge from '../shared/PartnerLogoBadge'
import SectionTitle from '../shared/SectionTitle'

const momentsPerRow = 3
const initialMomentsCount = 6
const momentsLoadStep = momentsPerRow

export default function HomePage({ content, language, onNavigate, onOpenVideo }) {
  const [dynamicMomentEntries, setDynamicMomentEntries] = useState([])
  const localizedDynamicMomentCards = useMemo(
    () =>
      dynamicMomentEntries.map((item) => ({
        id: item.id,
        badge: language === 'ar' ? item.badgeAr || item.badge : item.badge,
        type: item.type,
        title: language === 'ar' ? item.titleAr || item.title : item.title,
        note: language === 'ar' ? item.noteAr || item.note : item.note,
        size: item.size,
        tone: item.tone,
        image: item.image,
        imageAlt:
          language === 'ar'
            ? item.imageAltAr || item.imageAlt || item.titleAr || item.title
            : item.imageAlt || item.title,
        videoUrl: item.videoUrl || '',
        videoPoster: item.videoPoster || item.image || '',
      })),
    [dynamicMomentEntries, language],
  )
  const allMomentCards = useMemo(
    () => [...localizedDynamicMomentCards, ...content.mediaMoments.cards],
    [content.mediaMoments.cards, localizedDynamicMomentCards],
  )
  const totalMoments = allMomentCards.length
  const [visibleMomentCount, setVisibleMomentCount] = useState(() =>
    Math.min(initialMomentsCount, totalMoments),
  )

  useEffect(() => {
    let ignore = false

    async function loadDynamicMoments() {
      try {
        const entries = await fetchAroundRoomMedia()

        if (!ignore) {
          setDynamicMomentEntries(entries || [])
        }
      } catch {
        if (!ignore) {
          setDynamicMomentEntries([])
        }
      }
    }

    loadDynamicMoments()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    setVisibleMomentCount(Math.min(initialMomentsCount, totalMoments))
  }, [totalMoments])

  const visibleMomentCards = allMomentCards.slice(0, visibleMomentCount)
  const remainingMomentCount = totalMoments - visibleMomentCount
  const hasMoreMoments = remainingMomentCount > 0

  const handleLoadMoreMoments = () => {
    startTransition(() => {
      setVisibleMomentCount((currentCount) =>
        Math.min(totalMoments, currentCount + momentsLoadStep),
      )
    })
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <h1>{content.hero.title}</h1>
            <p className="hero-text">{content.hero.text}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => onNavigate('contact', 'apply')}
              >
                {content.hero.primary}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => onNavigate('home', 'tracks')}
              >
                {content.hero.secondary}
              </button>
            </div>

            <div className="hero-stats">
              {content.hero.stats.map((item) => (
                <StatCard key={`${item.value}-${item.label}`} value={item.value} label={item.label} />
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-logo-card">
              <div className="orbit-topline">
                <span className="tiny-badge">{content.hero.badges[0]}</span>
                <span className="tiny-badge tiny-badge--warm">{content.hero.badges[1]}</span>
              </div>

              <HackathonLockup content={content} variant="hero" />

              <h2>{content.hero.panelTitle}</h2>
              <p>{content.hero.panelText}</p>

              <div className="pillar-grid">
                {content.hero.pillars.map((pillar) => (
                  <span key={pillar} className="pillar-chip">
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-media-strip" aria-label={content.mediaGallery.title}>
              {content.hero.mediaCards.map((item) => (
                <MediaSlotCard
                  key={item.title}
                  item={item}
                  compact
                  onOpenVideo={onOpenVideo}
                  videoActionLabel={content.mediaModal.openLabel}
                />
              ))}
            </div>

            <div className="logo-float logo-float--left">
              <PartnerLogoBadge
                logo={siteImages.brand.codeSproutsLogo}
                alt="Code Sprouts Palestine logo"
                name="Code Sprouts Palestine"
                variant="float"
              />
            </div>
            <div className="logo-float logo-float--right">
              <PartnerLogoBadge
                logo={siteImages.brand.techFromPalestineLogo}
                alt="Tech From Palestine logo"
                name="Tech From Palestine"
                href={techFromPalestineUrl}
                variant="float"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--visual" id="gallery">
        <div className="container visual-story-layout visual-story-layout--gallery">
          <div className="visual-story-copy">
            <SectionTitle
              eyebrow={content.mediaGallery.eyebrow}
              title={content.mediaGallery.title}
              body={content.mediaGallery.body}
            />

            <div className="visual-chip-row">
              {content.mediaGallery.notes.map((item) => (
                <span key={item} className="visual-chip">
                  {item}
                </span>
              ))}
            </div>

            <article className="gallery-support-card">
              {content.mediaGallery.support.image ? (
                <div className="gallery-support-card__orb">
                  <img
                    src={content.mediaGallery.support.image}
                    alt={content.mediaGallery.support.imageAlt || content.mediaGallery.support.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <span className="gallery-support-card__badge">
                  {content.mediaGallery.support.badge}
                </span>
              )}
              <h3>{content.mediaGallery.support.title}</h3>
              <p>{content.mediaGallery.support.body}</p>

              <div className="gallery-support-list">
                {content.mediaGallery.support.steps.map((item) => (
                  <div key={item} className="gallery-support-step">
                    <span className="gallery-support-step__dot" aria-hidden="true" />
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="visual-storyboard visual-storyboard--gallery">
            <MediaSlotCard
              item={content.mediaGallery.featured}
              variant="gallery"
              onOpenVideo={onOpenVideo}
              videoActionLabel={content.mediaModal.openLabel}
              imageLoading="eager"
              imageFetchPriority="high"
            />
            {content.mediaGallery.cards.map((item) => (
              <MediaSlotCard
                key={item.title}
                item={item}
                variant="gallery"
                onOpenVideo={onOpenVideo}
                videoActionLabel={content.mediaModal.openLabel}
                imageLoading="lazy"
                imageFetchPriority="auto"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--media-burst" id="moments">
        <div className="container">
          <div className="moments-head">
            <SectionTitle
              eyebrow={content.mediaMoments.eyebrow}
              title={content.mediaMoments.title}
              body={content.mediaMoments.body}
              inverted
            />

            <div className="visual-chip-row visual-chip-row--inverted">
              {content.mediaMoments.notes.map((item) => (
                <span key={item} className="visual-chip visual-chip--inverted">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="visual-storyboard visual-storyboard--moments">
            {visibleMomentCards.map((item, index) => (
              <MediaSlotCard
                key={item.id || `${item.title}-${index}`}
                item={item}
                variant="moments"
                onOpenVideo={onOpenVideo}
                videoActionLabel={content.mediaModal.openLabel}
                imageLoading="lazy"
                imageFetchPriority="low"
              />
            ))}
          </div>

          {hasMoreMoments ? (
            <div className="moments-actions">
              <button
                type="button"
                className="secondary-button moments-load-more"
                onClick={handleLoadMoreMoments}
              >
                {content.mediaMoments.loadMoreLabel} ({remainingMomentCount})
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <SectionTitle
            eyebrow={content.about.eyebrow}
            title={content.about.title}
            body={content.about.body}
          />

          <div className="feature-grid">
            {content.about.cards.map((card) => (
              <FeatureCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container">
          <SectionTitle
            eyebrow={content.whyJoin.eyebrow}
            title={content.whyJoin.title}
            body={content.whyJoin.body}
          />

          <div className="feature-grid">
            {content.whyJoin.cards.map((card) => (
              <FeatureCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="tracks">
        <div className="container">
          <SectionTitle
            eyebrow={content.tracks.eyebrow}
            title={content.tracks.title}
            body={content.tracks.body}
          />

          <div className="track-grid">
            {content.tracks.cards.map((track) => (
              <article key={track.title} className="track-card">
                <span className="card-eyebrow">{track.eyebrow}</span>
                <h3>{track.title}</h3>
                <p>{track.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container">
          <SectionTitle
            eyebrow={content.experience.eyebrow}
            title={content.experience.title}
            body={content.experience.body}
          />

          <div className="showcase-grid">
            {content.experience.cards.map((item) => (
              <article key={item.title} className="feature-card feature-card--showcase">
                <span className="card-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container story-layout">
          <div>
            <SectionTitle
              eyebrow={content.submit.eyebrow}
              title={content.submit.title}
              body={content.submit.body}
            />
          </div>

          <div className="steps-card">
            {content.submit.steps.map((step, index) => (
              <div key={step} className="step-row">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionTitle
            eyebrow={content.judging.eyebrow}
            title={content.judging.title}
            body={content.judging.body}
            inverted
          />

          <div className="timeline-grid judging-grid">
            {content.judging.cards.map((item) => (
              <article key={item.title} className="timeline-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow={content.timeline.eyebrow}
            title={content.timeline.title}
            body={content.timeline.body}
          />

          <div className="timeline-grid">
            {content.timeline.cards.map((item) => (
              <article key={item.title} className="timeline-card timeline-card--light">
                <span className="card-eyebrow">{item.phase}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="partners">
        <div className="container">
          <SectionTitle
            eyebrow={content.partners.eyebrow}
            title={content.partners.title}
            body={content.partners.body}
          />

          <div className="partner-grid">
            {content.partners.cards.map((partner) => (
              <article key={partner.name} className="partner-card">
                <PartnerLogoBadge
                  logo={partner.logo}
                  alt={`${partner.name} logo`}
                  name={partner.name}
                  href={partner.href}
                  variant="partner"
                />
                <div>
                  <h3>{partner.name}</h3>
                  <p>{partner.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" id="faq">
        <div className="container">
          <SectionTitle
            eyebrow={content.faq.eyebrow}
            title={content.faq.title}
            body={content.faq.body}
          />

          <div className="faq-grid">
            {content.faq.items.map((item) => (
              <article key={item.question} className="faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-band">
          <div>
            <span className="eyebrow">{content.cta.eyebrow}</span>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.body}</p>
          </div>

          <div className="cta-logo-wrap">
            <HackathonLockup content={content} variant="compact" />
            <button
              type="button"
              className="primary-button"
              onClick={() => onNavigate('contact', 'apply')}
            >
              {content.cta.button}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
