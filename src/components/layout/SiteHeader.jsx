import { siteImages } from '../../config/siteImages'
import { buildLanguageHref } from '../../utils/appUtils'

export default function SiteHeader({
  content,
  currentLanguage,
  route,
  menuOpen,
  onNavigate,
  onToggleMenu,
}) {
  const trackerLabel = currentLanguage === 'ar' ? 'متابعة المشروع' : 'Track project'
  const acceptedLabel = currentLanguage === 'ar' ? 'المشاريع المقبولة' : 'Accepted projects'
  const navItems = [
    { label: content.nav.home, page: 'home', section: '' },
    { label: content.nav.accepted || acceptedLabel, page: 'accepted', section: '' },
    { label: content.nav.tracks, page: 'home', section: 'tracks' },
    { label: content.nav.partners, page: 'home', section: 'partners' },
    { label: content.nav.faq, page: 'home', section: 'faq' },
    { label: content.nav.contact, page: 'contact', section: '' },
    { label: content.nav.track || trackerLabel, page: 'tracker', section: '' },
    { label: content.nav.dashboard, page: 'dashboard', section: '' },
  ]

  return (
    <header className="site-header">
      <div className="container nav-bar">
        <div className="brand">
          <button
            type="button"
            className="brand-home"
            onClick={() => onNavigate('home')}
            aria-label={content.nav.home}
          >
            <img
              className="brand-mark"
              src={siteImages.brand.hackathonLogo}
              alt={content.hackathonLogoAlt}
            />
          </button>
        </div>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={`${item.page}-${item.section || 'root'}`}
              type="button"
              className={`nav-link ${
                route.page === item.page && (!item.section || route.section === item.section)
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => onNavigate(item.page, item.section)}
              aria-current={
                route.page === item.page && (!item.section || route.section === item.section)
                  ? 'page'
                  : undefined
              }
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            className="nav-cta"
            onClick={() => onNavigate('contact', 'apply')}
          >
            {content.nav.apply}
          </button>
        </nav>

        <div className="header-actions">
          <div className="language-switcher" aria-label="Language switcher">
            <a
              className={`language-chip ${currentLanguage === 'en' ? 'is-active' : ''}`}
              href={buildLanguageHref('en')}
            >
              {content.languageSwitch.en}
            </a>
            <a
              className={`language-chip ${currentLanguage === 'ar' ? 'is-active' : ''}`}
              href={buildLanguageHref('ar')}
            >
              {content.languageSwitch.ar}
            </a>
          </div>

          <button
            type="button"
            className="menu-button"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
