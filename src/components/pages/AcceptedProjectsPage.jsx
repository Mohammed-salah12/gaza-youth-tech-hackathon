import AcceptedProjectsSection from '../shared/AcceptedProjectsSection'

export default function AcceptedProjectsPage({ content, language, onNavigate, onOpenVideo }) {
  return (
    <AcceptedProjectsSection
      content={content}
      language={language}
      onNavigate={onNavigate}
      onOpenVideo={onOpenVideo}
    />
  )
}
