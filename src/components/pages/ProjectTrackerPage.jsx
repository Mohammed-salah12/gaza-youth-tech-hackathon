import { useEffect, useMemo, useState } from 'react'
import { initialFormState, projectTrackerStorageKey } from '../../config/appConfig'
import { fetchSubmissionByProjectId, submitApplication } from '../../utils/apiClient'
import {
  formatSubmissionDate,
  getProjectVideoStatusLabel,
  isFilled,
} from '../../utils/appUtils'
import { Field, FileUploadField, SavedProjectMedia } from '../forms/ApplicationForm'

const persistedFormFields = Object.keys(initialFormState)

function buildTrackerCopy(language) {
  if (language === 'ar') {
    return {
      eyebrow: 'متابعة المشروع',
      title: 'تابع المشروع أو أكمل ما بقي عليه',
      text:
        'هذه الصفحة تعرض فقط ما تحتاجه بعد الإرسال: حالة القبول، الخطوات التالية، وحقول التحديث المهمة مثل الفيديو والرابط ووسيلة التواصل.',
      loadLabel: 'افتح المشروع',
      loading: 'جارٍ تحميل المشروع...',
      loaded: 'تم تحميل المشروع. يمكنك الآن متابعة الحالة أو رفع التحديثات المطلوبة.',
      saveAction: 'احفظ تحديثات المتابعة',
      saving: 'جارٍ حفظ التحديثات...',
      loadError: 'تعذر العثور على المشروع. تحقق من رقم المشروع ثم حاول مرة أخرى.',
      saveError: 'تعذر حفظ التحديثات الآن. حاول مرة أخرى بعد قليل.',
      saveSuccess: 'تم حفظ تحديثات المشروع بنجاح.',
      emptyTitle: 'ابدأ برقم المشروع',
      emptyText:
        'أدخل رقم المشروع لعرض حالة القبول والخطوات المطلوبة وحقول رفع الفيديو والتحديثات فقط.',
      summaryTitle: 'ملخص سريع',
      summaryText:
        'تفاصيل الطالب والفريق محفوظة من الطلب الأصلي. استخدم هذه الصفحة فقط لمتابعة الحالة أو تحديث ما يلزم للمشروع.',
      acceptanceStatusLabel: 'حالة القبول',
      nextActionLabel: 'الإجراء المطلوب الآن',
      nextTitle: 'ما الذي يجب فعله الآن؟',
      detailsTitle: 'تحديثات المتابعة',
      detailsText:
        'يمكنك هنا تحديث مرحلة المشروع، جهة التواصل، الرابط الإضافي، ورفع الفيديو أو الصور إذا أصبحت جاهزة.',
      projectNameLabel: 'المشروع المحفوظ',
      followUpWindowLabel: 'فترة المتابعة',
      originalDetailsNotice:
        'إذا احتجت إلى تعديل كبير في بيانات الطالب أو وصف الفكرة، فمن الأفضل التواصل مع المنظمين.',
      goToApply: 'العودة إلى التقديم',
      statusHelp: {
        submitted: 'تم استلام المشروع وهو ينتظر بدء المراجعة.',
        reviewing: 'المشروع قيد المراجعة من قبل المنظمين الآن.',
        shortlisted: 'المشروع ضمن القائمة المختصرة ويحتاج متابعة قريبة.',
        accepted: 'تم قبول المشروع حاليًا.',
        waitlisted: 'المشروع في قائمة الانتظار حاليًا.',
        declined: 'المشروع غير مقبول حاليًا.',
      },
      nextActions: {
        ideaWithoutVideo: [
          'أكمل بناء المشروع أولًا',
          'غيّر مرحلة المشروع عندما يصبح نموذجًا أوليًا أو نسخة عاملة',
          'ارفع فيديو المشروع من هذه الصفحة عندما يصبح جاهزًا',
        ],
        buildWithoutVideo: [
          'ارفع فيديو المشروع الآن حتى يكتمل ملف المراجعة',
          'تأكد من أن وسيلة التواصل الحالية صحيحة',
          'أضف رابطًا إضافيًا إذا كان هناك نموذج أو مستودع أو عرض',
        ],
        withVideo: [
          'راجع حالة القبول من هذه الصفحة فقط',
          'استبدل الفيديو أو الصور فقط إذا أصبح لديك إصدار أحدث',
          'احتفظ برقم المشروع لأي متابعة لاحقة',
        ],
      },
    }
  }

  return {
    eyebrow: 'Project follow-up',
    title: 'Check status or continue this project',
    text:
      'This page only shows what the participant needs after submission: acceptance status, next steps, and the small update form for video, link, stage, and contact details.',
    loadLabel: 'Open project',
    loading: 'Loading project...',
    loaded: 'The project is loaded. You can now check its status or upload the needed updates.',
    saveAction: 'Save follow-up changes',
    saving: 'Saving follow-up changes...',
    loadError: 'The project could not be found. Check the project ID and try again.',
    saveError: 'The follow-up changes could not be saved right now. Please try again.',
    saveSuccess: 'Project follow-up changes were saved successfully.',
    emptyTitle: 'Start with the project ID',
    emptyText:
      'Enter the project ID to see the acceptance status, the next required steps, and only the upload/update fields that matter now.',
    summaryTitle: 'Quick status view',
    summaryText:
      'The student and team details stay saved from the original application. Use this page only for status follow-up and the project updates that are needed now.',
    acceptanceStatusLabel: 'Acceptance status',
    nextActionLabel: 'What to do now',
    nextTitle: 'What needs to happen next?',
    detailsTitle: 'Follow-up updates',
    detailsText:
      'Update the project stage, best contact, extra link, and the hosted video or images here without reopening the full submission.',
    projectNameLabel: 'Saved project',
    followUpWindowLabel: 'Follow-up window',
    originalDetailsNotice:
      'If you need to change the student profile or rewrite the full project story, it is better to contact the organizers directly.',
    goToApply: 'Back to application',
    statusHelp: {
      submitted: 'The project has been received and is waiting for organizer review.',
      reviewing: 'The organizers are currently reviewing the project.',
      shortlisted: 'The project is shortlisted and may need closer follow-up.',
      accepted: 'The project is currently accepted.',
      waitlisted: 'The project is currently on the waitlist.',
      declined: 'The project is currently declined.',
    },
    nextActions: {
      ideaWithoutVideo: [
        'Finish building the project first',
        'Change the project stage when it becomes a prototype or working build',
        'Upload the project video here when it is ready',
      ],
      buildWithoutVideo: [
        'Upload the project video now so the review can move forward',
        'Make sure the contact details are still correct',
        'Add an extra link if you now have a prototype, repo, or demo',
      ],
      withVideo: [
        'Use this page to check the acceptance status only',
        'Replace the video or images only if you have a newer version',
        'Keep the project ID for any later follow-up',
      ],
    },
  }
}

export default function ProjectTrackerPage({ content, language, onNavigate }) {
  const trackerCopy = buildTrackerCopy(language)
  const [projectLookupId, setProjectLookupId] = useState(
    () => window.localStorage.getItem(projectTrackerStorageKey) || '',
  )
  const [projectData, setProjectData] = useState(null)
  const [draftState, setDraftState] = useState({
    projectStage: '',
    projectLink: '',
    contact: '',
  })
  const [showValidation, setShowValidation] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [projectVideoFile, setProjectVideoFile] = useState(null)
  const [projectImageFiles, setProjectImageFiles] = useState([])

  const reviewStagesById = Object.fromEntries(
    content.dashboard.reviewStages.map((item) => [item.id, item.label]),
  )

  const handleLoadProject = async (lookupValue = projectLookupId, customLoadingMessage = '') => {
    const normalizedProjectId = String(lookupValue || '').trim().toUpperCase()

    if (!normalizedProjectId) {
      setFeedback(content.form.feedback.projectIdNeeded)
      return
    }

    setIsLoading(true)
    setFeedback(customLoadingMessage || trackerCopy.loading)

    try {
      const submission = await fetchSubmissionByProjectId(normalizedProjectId)
      setProjectData(submission)
      setDraftState({
        projectStage: submission.projectStage || '',
        projectLink: submission.projectLink || '',
        contact: submission.contact || '',
      })
      setProjectLookupId(submission.projectId || normalizedProjectId)
      setProjectVideoFile(null)
      setProjectImageFiles([])
      setShowValidation(false)
      window.localStorage.setItem(
        projectTrackerStorageKey,
        submission.projectId || normalizedProjectId,
      )
      setFeedback(trackerCopy.loaded)
    } catch (error) {
      setFeedback(error.message || trackerCopy.loadError)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const savedProjectId = String(projectLookupId || '').trim()

    if (!savedProjectId) {
      return
    }

    void handleLoadProject(savedProjectId, '')
    // We intentionally run this only once so the tracker page can auto-open the last project.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeProjectStage = draftState.projectStage || projectData?.projectStage || ''
  const isIdeaStage = activeProjectStage === 'idea'
  const hasUploadedProjectVideo = Boolean(projectData?.projectVideo?.url || projectData?.projectVideo?.path)
  const hasPendingProjectVideo = Boolean(projectVideoFile)
  const requiresProjectVideoNow = isFilled(activeProjectStage) && activeProjectStage !== 'idea'
  const projectVideoIsRequired =
    requiresProjectVideoNow && !hasUploadedProjectVideo && !hasPendingProjectVideo
  const projectVideoStatusKey = hasUploadedProjectVideo
    ? 'uploaded'
    : activeProjectStage === 'idea'
      ? 'followUpAllowed'
      : 'requiredNow'
  const projectVideoStatusLabel = getProjectVideoStatusLabel(projectVideoStatusKey, content.form)
  const reviewStatusLabel =
    reviewStagesById[projectData?.reviewStage] || content.form.projectStatusFallback
  const followUpDeadline = projectData?.videoFollowUpDeadline
    ? formatSubmissionDate(projectData.videoFollowUpDeadline, language)
    : ''
  const savedProjectVideoItems = projectData?.projectVideo?.url ? [projectData.projectVideo] : []
  const savedProjectImageItems = projectData?.projectImages || []

  const nextActions = useMemo(() => {
    if (!projectData) {
      return []
    }

    if (hasUploadedProjectVideo || hasPendingProjectVideo) {
      return trackerCopy.nextActions.withVideo
    }

    if (isIdeaStage) {
      return trackerCopy.nextActions.ideaWithoutVideo
    }

    return trackerCopy.nextActions.buildWithoutVideo
  }, [
    hasPendingProjectVideo,
    hasUploadedProjectVideo,
    isIdeaStage,
    projectData,
    trackerCopy.nextActions.buildWithoutVideo,
    trackerCopy.nextActions.ideaWithoutVideo,
    trackerCopy.nextActions.withVideo,
  ])
  const primaryNextAction = nextActions[0] || '—'

  const handleUpdateField = (name, value) => {
    setDraftState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSaveUpdates = async (event) => {
    event.preventDefault()
    setShowValidation(true)

    if (!projectData) {
      setFeedback(content.form.feedback.projectIdNeeded)
      return
    }

    const payload = new FormData()
    const nextSubmission = {
      ...projectData,
      projectStage: draftState.projectStage,
      projectLink: draftState.projectLink,
      contact: draftState.contact,
    }

    persistedFormFields.forEach((field) => {
      payload.append(field, String(nextSubmission[field] ?? ''))
    })

    if (projectVideoFile) {
      payload.append('projectVideo', projectVideoFile)
    }

    projectImageFiles.forEach((file) => {
      payload.append('projectImages', file)
    })

    setIsSaving(true)
    setFeedback(trackerCopy.saving)

    try {
      const savedSubmission = await submitApplication(payload)
      setProjectData(savedSubmission)
      setDraftState({
        projectStage: savedSubmission.projectStage || '',
        projectLink: savedSubmission.projectLink || '',
        contact: savedSubmission.contact || '',
      })
      setProjectLookupId(savedSubmission.projectId || savedSubmission.submissionId || '')
      setProjectVideoFile(null)
      setProjectImageFiles([])
      setShowValidation(false)
      window.localStorage.setItem(
        projectTrackerStorageKey,
        savedSubmission.projectId || savedSubmission.submissionId || '',
      )
      setFeedback(trackerCopy.saveSuccess)
    } catch (error) {
      setFeedback(error.message || trackerCopy.saveError)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <section className="contact-hero contact-hero--tracker">
        <div className="container contact-hero-grid">
          <div className="contact-hero-copy">
            <span className="eyebrow">{trackerCopy.eyebrow}</span>
            <h1>{trackerCopy.title}</h1>
            <p className="hero-text">{trackerCopy.text}</p>

            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => handleLoadProject()}>
                {isLoading ? trackerCopy.loading : trackerCopy.loadLabel}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => onNavigate('contact', 'apply')}
              >
                {trackerCopy.goToApply}
              </button>
            </div>
          </div>

          <div className="contact-brand-card tracker-lookup-card">
            <div className="project-tracker-card tracker-lookup-card__inner">
              <div className="project-tracker-card__copy">
                <strong>{content.form.projectTrackerTitle}</strong>
                <p>{content.form.projectTrackerText}</p>
              </div>
              <div className="project-tracker-card__actions">
                <input
                  value={projectLookupId}
                  onChange={(event) => setProjectLookupId(event.target.value.toUpperCase())}
                  placeholder={content.form.placeholders.projectId}
                  aria-label={content.form.fields.projectId}
                />
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleLoadProject()}
                  disabled={isLoading}
                >
                  {isLoading ? trackerCopy.loading : trackerCopy.loadLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="tracker">
        <div className="container tracker-page">
          {projectData ? (
            <div className="tracker-layout">
              <aside className="tracker-sidebar">
                <article className="project-tracker-card tracker-status-card">
                  <span className="card-eyebrow">{trackerCopy.summaryTitle}</span>
                  <strong>{projectData.projectName || trackerCopy.projectNameLabel}</strong>
                  <p>{trackerCopy.summaryText}</p>

                  <div className="tracking-banner">
                    <div>
                      <span>{content.form.fields.projectId}</span>
                      <strong>{projectData.projectId}</strong>
                    </div>
                    <div>
                      <span>{trackerCopy.acceptanceStatusLabel}</span>
                      <strong>{reviewStatusLabel}</strong>
                    </div>
                    <div>
                      <span>{trackerCopy.nextActionLabel}</span>
                      <strong>{primaryNextAction}</strong>
                    </div>
                    {followUpDeadline ? (
                      <div>
                        <span>{trackerCopy.followUpWindowLabel}</span>
                        <strong>{followUpDeadline}</strong>
                      </div>
                    ) : null}
                  </div>

                  <p className="tracker-status-card__note">
                    {trackerCopy.statusHelp[projectData.reviewStage] || reviewStatusLabel}
                  </p>
                </article>

                <article className="upload-guidance-card tracker-next-card">
                  <strong>{trackerCopy.nextTitle}</strong>
                  <div className="stage-flow-list">
                    {nextActions.map((step) => (
                      <div key={step} className="stage-flow-step">
                        <span aria-hidden="true" />
                        <strong>{step}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              </aside>

              <div className="form-shell form-shell--enhanced tracker-form-shell">
                <form className="application-form tracker-form" onSubmit={handleSaveUpdates}>
                  <div className="form-header">
                    <span className="card-eyebrow">{trackerCopy.detailsTitle}</span>
                    <h2>{trackerCopy.projectNameLabel}: {projectData.projectName}</h2>
                    <p>{trackerCopy.detailsText}</p>
                  </div>

                  <FormSection
                    step="01"
                    title={content.form.fields.projectStage}
                    text={trackerCopy.originalDetailsNotice}
                  >
                    <div className="stage-row">
                      {content.form.stages.map((stage) => (
                        <button
                          key={stage.id}
                          type="button"
                          className={`stage-chip ${activeProjectStage === stage.id ? 'is-selected' : ''}`}
                          aria-pressed={activeProjectStage === stage.id}
                          onClick={() => handleUpdateField('projectStage', stage.id)}
                        >
                          {stage.label}
                        </button>
                      ))}
                    </div>
                  </FormSection>

                  <FormSection
                    step="02"
                    title={trackerCopy.detailsTitle}
                    text={trackerCopy.detailsText}
                  >
                    <div className="field-grid">
      <Field
                        label={content.form.fields.contact}
                        name="contact"
                        value={draftState.contact}
                        onChange={(event) => handleUpdateField('contact', event.target.value)}
                        placeholder={content.form.placeholders.contact}
                        helper={
                          projectData.applicationOwner === 'adult'
                            ? content.form.helpers.contactAdult
                            : content.form.helpers.contactSelf
                        }
                        required
                        invalid={showValidation && !isFilled(draftState.contact)}
                      />
                      <Field
                        label={content.form.fields.projectLink}
                        name="projectLink"
                        type="url"
                        value={draftState.projectLink}
                        onChange={(event) => handleUpdateField('projectLink', event.target.value)}
                        placeholder={content.form.placeholders.projectLink}
                        helper={content.form.helpers.projectLink}
                        optionalText={content.form.optionalLabel}
                      />
                    </div>

                  <div className="field-grid field-grid--stacked">
                    <FileUploadField
                      label={content.form.fields.projectVideo}
                        helper={
                          isIdeaStage
                            ? content.form.helpers.projectVideoIdea
                            : content.form.helpers.projectVideoRequired
                        }
                        accept="video/*"
                        invalid={showValidation && projectVideoIsRequired}
                        requiredText={!isIdeaStage ? content.form.requiredLabel : undefined}
                        optionalText={isIdeaStage ? content.form.optionalLabel : undefined}
                        actionLabel={content.form.uploadVideoAction}
                        replaceLabel={content.form.replaceVideoAction}
                        clearLabel={content.form.clearSelectedVideo}
                        emptyStateText={content.form.uploadVideoEmpty}
                        selectedFiles={projectVideoFile ? [projectVideoFile] : []}
                        savedItems={savedProjectVideoItems}
                        savedLabel={content.form.savedVideoLabel}
                        onFilesChange={(fileList) => setProjectVideoFile(fileList?.[0] || null)}
                        onClear={() => setProjectVideoFile(null)}
                      />
                    </div>

                  <div className="field-grid field-grid--stacked">
                    <FileUploadField
                      label={content.form.fields.projectImages}
                        helper={content.form.helpers.projectImages}
                        accept="image/*"
                        multiple
                        optionalText={content.form.optionalLabel}
                        actionLabel={content.form.uploadImagesAction}
                        replaceLabel={content.form.replaceImagesAction}
                        clearLabel={content.form.clearSelectedImages}
                        emptyStateText={content.form.uploadImagesEmpty}
                        selectedFiles={projectImageFiles}
                        savedItems={savedProjectImageItems}
                        savedLabel={content.form.savedImagesLabel}
                        limitNote={content.form.imageLimitNote}
                        onFilesChange={(fileList) => setProjectImageFiles(Array.from(fileList || []))}
                        onClear={() => setProjectImageFiles([])}
                      />
                    </div>
                  </FormSection>

                  {hasUploadedProjectVideo || projectData.projectImages?.length ? (
                    <SavedProjectMedia
                      content={content}
                      formState={projectData}
                      language={language}
                      projectVideoStatusLabel={projectVideoStatusLabel}
                    />
                  ) : null}

                  <div className="wizard-actions">
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={() => onNavigate('contact', 'apply')}
                    >
                      {trackerCopy.goToApply}
                    </button>
                    <button type="submit" className="primary-button" disabled={isSaving}>
                      {isSaving ? trackerCopy.saving : trackerCopy.saveAction}
                    </button>
                  </div>

                  {feedback ? <p className="form-feedback">{feedback}</p> : null}
                </form>
              </div>
            </div>
          ) : (
            <div className="tracker-empty-state">
              <span className="card-eyebrow">{trackerCopy.eyebrow}</span>
              <h2>{trackerCopy.emptyTitle}</h2>
              <p>{trackerCopy.emptyText}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function FormSection({ step, title, text, children }) {
  return (
    <section className="form-section">
      <div className="form-section__head">
        <span className="form-section__step">{step}</span>
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
