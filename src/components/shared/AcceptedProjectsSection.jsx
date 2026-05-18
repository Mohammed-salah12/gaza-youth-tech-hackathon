import { useEffect, useMemo, useState } from 'react'
import { fetchAcceptedProjects } from '../../utils/apiClient'
import SectionTitle from './SectionTitle'

function buildAcceptedProjectsCopy(language) {
  if (language === 'ar') {
    return {
      preview: {
        eyebrow: 'المشاريع المقبولة',
        title: 'نماذج من المشاريع المقبولة حتى الآن',
        body:
          'هذه لمحة سريعة من المشاريع التي تم قبولها ومعها فيديوهات جاهزة للمشاهدة. لعرض المزيد، افتح الصفحة الكاملة الخاصة بالمشاريع المقبولة.',
      },
      page: {
        eyebrow: 'فيديوهات المشاريع المقبولة',
        title: 'شاهد المشاريع المقبولة وتعرّف على أصحابها',
        body:
          'هذه الصفحة تجمع المشاريع المقبولة التي أرسل أصحابها فيديوهات للمشروع، حتى يتمكن الزوار من استكشاف الفكرة ومشاهدة العرض لكل مشروع.',
      },
      acceptedBadge: 'مقبول',
      watchLabel: 'شاهد الفيديو',
      viewAllLabel: 'عرض كل المشاريع المقبولة',
      backLabel: 'العودة إلى الصفحة الرئيسية',
      openLinkLabel: 'فتح رابط المشروع',
      participantLabel: 'أصحاب المشروع',
      cityLabel: 'المدينة',
      categoryLabel: 'المجال',
      stageLabel: 'مرحلة المشروع',
      loading: 'جارٍ تحميل المشاريع المقبولة...',
      error: 'المشاريع ما زالت قيد التطوير الآن، وسيتم عرضها هنا قريبًا.',
      empty:
        'المشاريع ما زالت قيد التطوير الآن، وسيتم عرضها هنا قريبًا.',
      countLabel: 'عدد المشاريع المعروضة: {count}',
      watchAriaLabel: 'شاهد فيديو المشروع',
    }
  }

  return {
    preview: {
      eyebrow: 'Accepted projects',
      title: 'A quick look at accepted projects',
      body:
        'This landing-page preview highlights accepted projects that already have a project video ready to watch. Open the full page to browse the complete list.',
    },
    page: {
      eyebrow: 'Accepted project videos',
      title: 'Browse accepted projects and watch each team’s video',
      body:
        'This page collects accepted projects that already include a hosted project video, so visitors can explore the idea and watch the demo for each project.',
    },
    acceptedBadge: 'Accepted',
    watchLabel: 'Watch video',
    viewAllLabel: 'View all accepted projects',
    backLabel: 'Back to the landing page',
    openLinkLabel: 'Open project link',
    participantLabel: 'Project team',
    cityLabel: 'City',
    categoryLabel: 'Category',
    stageLabel: 'Project stage',
    loading: 'Loading accepted projects...',
    error: 'The projects are under development right now and will be shown here soon.',
    empty:
      'The projects are under development right now and will be shown here soon.',
    countLabel: 'Projects shown: {count}',
    watchAriaLabel: 'Watch the project video',
  }
}

function formatProjectLink(url) {
  const trimmedUrl = String(url || '').trim()

  if (!trimmedUrl) {
    return ''
  }

  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmedUrl)) {
    return trimmedUrl
  }

  return `https://${trimmedUrl}`
}

function getProjectInitials(projectName) {
  const initials = String(projectName || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || '')
    .join('')

  return initials || 'GY'
}

function buildVideoItem(project, copy) {
  return {
    type: 'video',
    badge: copy.acceptedBadge,
    title: project.projectName,
    note: project.description || project.problem || '',
    videoUrl: project.projectVideo?.url || '',
    videoPoster: project.coverImage?.url || '',
    image: project.coverImage?.url || '',
    imageAlt: project.projectName,
  }
}

function buildLookupMap(items = []) {
  return Object.fromEntries(items.map((item) => [item.id, item.label]))
}

export default function AcceptedProjectsSection({
  content,
  language,
  onNavigate,
  onOpenVideo,
  preview = false,
}) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadFailed, setLoadFailed] = useState(false)
  const copy = buildAcceptedProjectsCopy(language)
  const sectionCopy = preview ? copy.preview : copy.page
  const categoryLabels = useMemo(
    () => buildLookupMap(content.form?.categories || []),
    [content.form?.categories],
  )
  const stageLabels = useMemo(
    () => buildLookupMap(content.form?.stages || []),
    [content.form?.stages],
  )

  useEffect(() => {
    let ignore = false

    async function loadAcceptedProjects() {
      setIsLoading(true)
      setLoadFailed(false)

      try {
        const rows = await fetchAcceptedProjects()

        if (!ignore) {
          setProjects(Array.isArray(rows) ? rows : [])
        }
      } catch {
        if (!ignore) {
          setProjects([])
          setLoadFailed(true)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadAcceptedProjects()

    return () => {
      ignore = true
    }
  }, [])

  const visibleProjects = preview ? projects.slice(0, 3) : projects
  const countLabel = copy.countLabel.replace('{count}', String(visibleProjects.length))

  return (
    <section
      className={`section accepted-projects ${preview ? 'accepted-projects--preview' : 'accepted-projects--page'}`}
      id={preview ? 'accepted-projects' : undefined}
    >
      <div className="container">
        <div className="accepted-projects__header">
          <div className="accepted-projects__title">
            <SectionTitle
              eyebrow={sectionCopy.eyebrow}
              title={sectionCopy.title}
              body={sectionCopy.body}
            />
          </div>

          <div className="accepted-projects__header-side">
            <span className="accepted-projects__count">{countLabel}</span>

            {preview ? (
              <button
                type="button"
                className="secondary-button accepted-projects__header-button"
                onClick={() => onNavigate('accepted')}
              >
                {copy.viewAllLabel}
              </button>
            ) : (
              <button
                type="button"
                className="secondary-button accepted-projects__header-button"
                onClick={() => onNavigate('home', 'accepted-projects')}
              >
                {copy.backLabel}
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="accepted-projects__status-card">
            <p>{copy.loading}</p>
          </div>
        ) : visibleProjects.length ? (
          <div className="accepted-projects__grid">
            {visibleProjects.map((project) => {
              const participantNames = Array.isArray(project.participantNames)
                ? project.participantNames.filter(Boolean)
                : []
              const coverImageUrl = project.coverImage?.url || ''
              const projectLinkUrl = formatProjectLink(project.projectLink)

              return (
                <article key={project.id || project.projectId} className="accepted-project-card">
                  <button
                    type="button"
                    className={`accepted-project-card__visual ${
                      coverImageUrl ? 'has-image' : 'is-placeholder'
                    }`}
                    onClick={() => onOpenVideo?.(buildVideoItem(project, copy))}
                    aria-label={`${copy.watchAriaLabel}: ${project.projectName}`}
                  >
                    {coverImageUrl ? (
                      <img src={coverImageUrl} alt={project.projectName} loading="lazy" decoding="async" />
                    ) : (
                      <div className="accepted-project-card__placeholder">
                        <span>{getProjectInitials(project.projectName)}</span>
                        <small>{categoryLabels[project.category] || project.category || 'Project'}</small>
                      </div>
                    )}

                    <div className="accepted-project-card__overlay">
                      <span className="accepted-project-card__badge">{copy.acceptedBadge}</span>
                      <span className="accepted-project-card__watch-pill">{copy.watchLabel}</span>
                    </div>
                  </button>

                  <div className="accepted-project-card__body">
                    <div className="accepted-project-card__meta-row">
                      <span>{categoryLabels[project.category] || project.category || '—'}</span>
                      <span>{stageLabels[project.projectStage] || project.projectStage || '—'}</span>
                    </div>

                    <h3>{project.projectName}</h3>
                    <p>{project.description || project.problem || '—'}</p>

                    <dl className="accepted-project-card__details">
                      <div>
                        <dt>{copy.participantLabel}</dt>
                        <dd>{participantNames.join(', ') || project.fullName || '—'}</dd>
                      </div>

                      <div>
                        <dt>{copy.cityLabel}</dt>
                        <dd>{project.city || '—'}</dd>
                      </div>

                      <div>
                        <dt>{copy.categoryLabel}</dt>
                        <dd>{categoryLabels[project.category] || project.category || '—'}</dd>
                      </div>

                      <div>
                        <dt>{copy.stageLabel}</dt>
                        <dd>{stageLabels[project.projectStage] || project.projectStage || '—'}</dd>
                      </div>
                    </dl>

                    <div className="accepted-project-card__actions">
                      <button
                        type="button"
                        className="primary-button accepted-project-card__action"
                        onClick={() => onOpenVideo?.(buildVideoItem(project, copy))}
                      >
                        {copy.watchLabel}
                      </button>

                      {projectLinkUrl ? (
                        <a
                          className="accepted-project-card__link"
                          href={projectLinkUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {copy.openLinkLabel}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="accepted-projects__status-card">
            <p>{loadFailed ? copy.error : copy.empty}</p>
          </div>
        )}

        {preview && projects.length > visibleProjects.length ? (
          <div className="accepted-projects__footer">
            <button
              type="button"
              className="secondary-button accepted-projects__footer-button"
              onClick={() => onNavigate('accepted')}
            >
              {copy.viewAllLabel}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
