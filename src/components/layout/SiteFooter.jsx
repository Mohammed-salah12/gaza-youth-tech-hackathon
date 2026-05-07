import {
  contactEmail,
  contactPhone,
  techFromPalestineUrl,
} from '../../config/appConfig'
import { siteImages } from '../../config/siteImages'
import PartnerLogoBadge from '../shared/PartnerLogoBadge'
import HackathonLockup from '../shared/HackathonLockup'

export default function SiteFooter({ content, onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <button
            type="button"
            className="footer-hackathon-mark"
            onClick={() => onNavigate('home')}
            aria-label={content.footer.home}
          >
            <HackathonLockup content={content} variant="compact" />
          </button>

          <div>
            <span className="eyebrow">{content.footer.eyebrow}</span>
            <h2>{content.footer.title}</h2>
            <p>{content.footer.text}</p>
          </div>
        </div>

        <div className="footer-center-block">
          <div className="footer-logo-strip">
            <PartnerLogoBadge
              logo={siteImages.brand.codeSproutsLogo}
              alt="Code Sprouts Palestine logo"
              name="Code Sprouts Palestine"
              variant="footer"
            />
            <PartnerLogoBadge
              logo={siteImages.brand.techFromPalestineLogo}
              alt="Tech From Palestine logo"
              name="Tech From Palestine"
              href={techFromPalestineUrl}
              variant="footer"
            />
          </div>

          <div className="footer-links">
            <button type="button" onClick={() => onNavigate('home')}>
              {content.footer.home}
            </button>
            <button type="button" onClick={() => onNavigate('home', 'tracks')}>
              {content.footer.tracks}
            </button>
            <button type="button" onClick={() => onNavigate('dashboard')}>
              {content.footer.dashboard}
            </button>
            <button type="button" onClick={() => onNavigate('contact', 'apply')}>
              {content.footer.apply}
            </button>
          </div>
        </div>

        <div className="footer-contact-card">
          <span className="card-eyebrow">{content.footer.contactTitle}</span>
          <p>{content.footer.contactText}</p>

          <div className="footer-contact-list">
            <a className="footer-contact-link" href={`mailto:${contactEmail}`}>
              <span>{content.footer.emailLabel}</span>
              <strong>{contactEmail}</strong>
            </a>
            <a className="footer-contact-link" href={`tel:${contactPhone}`}>
              <span>{content.footer.phoneLabel}</span>
              <strong>{contactPhone}</strong>
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-legal">
        <p>{content.footer.rights}</p>
      </div>
    </footer>
  )
}
