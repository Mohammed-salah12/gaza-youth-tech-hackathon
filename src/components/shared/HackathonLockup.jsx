import { siteImages } from '../../config/siteImages'

export default function HackathonLockup({ content, variant = 'hero' }) {
  return (
    <div className={`hackathon-lockup hackathon-lockup--${variant}`}>
      <img
        className="hackathon-lockup__icon"
        src={siteImages.brand.hackathonLogo}
        alt={content.hackathonLogoAlt}
      />
    </div>
  )
}
