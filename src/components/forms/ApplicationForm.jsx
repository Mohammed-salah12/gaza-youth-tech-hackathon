import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  initialFormState,
  projectTrackerStorageKey,
  routeStorageKey,
} from '../../config/appConfig'
import {
  formatSubmissionDate,
  getAdditionalTeamMembers,
  getAgeDetails,
  getProjectVideoStatusKey,
  getProjectVideoStatusLabel,
  isFilled,
  readStoredJson,
} from '../../utils/appUtils'
import { submitApplication } from '../../utils/apiClient'

const persistedFormFields = Object.keys(initialFormState)

export default function ApplicationForm({ content, language, onNavigate }) {
  const storedFormState = readStoredJson(routeStorageKey, initialFormState)
  const [formState, setFormState] = useState(() => ({
    ...initialFormState,
    ...storedFormState,
  }))
  const [projectLookupId, setProjectLookupId] = useState(() => storedFormState.projectId || '')
  const [feedback, setFeedback] = useState('')
  const [showValidation, setShowValidation] = useState(false)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projectVideoFile, setProjectVideoFile] = useState(null)
  const [projectImageFiles, setProjectImageFiles] = useState([])
  const [submissionSuccess, setSubmissionSuccess] = useState(null)

  const apiMessages =
    language === 'ar'
      ? {
          submitting: 'جارٍ حفظ الطلب ورفع الملفات...',
          failed: 'تعذر حفظ الطلب في الخادم الآن. تأكد من تشغيل الباك إند ثم حاول مرة أخرى.',
        }
      : {
          submitting: 'Saving your submission and uploading files...',
          failed: 'The submission could not be saved to the server right now. Make sure the backend is running, then try again.',
        }
  const trackerPageCopy =
    language === 'ar'
      ? {
          openTracker: 'افتح صفحة متابعة المشروع',
          trackerHint:
            'استخدم صفحة المتابعة الخفيفة لمعرفة حالة القبول ورفع الفيديو لاحقًا وتحديث التفاصيل المهمة فقط.',
          savedIdeaTitle: 'تم حفظ الفكرة',
          savedBuildTitle: 'تم حفظ المشروع للمراجعة',
          savedIdeaBody:
            'تم إنشاء رقم المشروع بنجاح. استخدم صفحة المتابعة لاحقًا لرفع فيديو المشروع ومعرفة حالة القبول.',
          savedBuildBody:
            'تم حفظ المشروع والملفات المرفوعة. استخدم صفحة المتابعة في أي وقت لمعرفة ما إذا كان المشروع قيد المراجعة أو مقبولًا أو مرفوضًا.',
          openTrackerAction: 'اذهب إلى صفحة المتابعة',
          stayHereAction: 'ابق هنا',
          nextStepsLabel: 'الخطوات التالية',
          ideaSteps: [
            'احتفظ برقم المشروع في مكان آمن',
            'أكمل بناء المشروع',
            'ارجع إلى صفحة المتابعة لرفع الفيديو عندما يصبح جاهزًا',
          ],
          buildSteps: [
            'احتفظ برقم المشروع للمتابعة',
            'راجع حالة القبول من صفحة المتابعة',
            'استبدل الفيديو أو الصور فقط إذا احتجت إلى تحديثها',
          ],
        }
      : {
          openTracker: 'Open tracker page',
          trackerHint:
            'Use the lighter follow-up page to check acceptance status, upload the video later, and update only the follow-up details.',
          savedIdeaTitle: 'Idea saved successfully',
          savedBuildTitle: 'Project saved for review',
          savedIdeaBody:
            'Your project ID is ready. Use the tracker page later to upload the project video and check the acceptance status.',
          savedBuildBody:
            'Your project and uploaded files were saved. Use the tracker page anytime to check whether it is under review, accepted, or declined.',
          openTrackerAction: 'Go to tracker page',
          stayHereAction: 'Stay here',
          nextStepsLabel: 'What to do next',
          ideaSteps: [
            'Keep the project ID somewhere safe',
            'Finish building the project',
            'Come back to the tracker page to upload the video when it is ready',
          ],
          buildSteps: [
            'Keep the project ID for follow-up',
            'Use the tracker page to check acceptance status',
            'Replace the video or images only if you need to update them',
          ],
        }

  useEffect(() => {
    window.localStorage.setItem(routeStorageKey, JSON.stringify(formState))
  }, [formState])

  const categoriesById = Object.fromEntries(
    content.form.categories.map((item) => [item.id, item.label]),
  )
  const stagesById = Object.fromEntries(
    content.form.stages.map((item) => [item.id, item.label]),
  )
  const reviewStagesById = Object.fromEntries(
    content.dashboard.reviewStages.map((item) => [item.id, item.label]),
  )
  const ageDetails = getAgeDetails(formState.age)
  const effectiveApplicationOwner = ageDetails.isUnder13 ? 'adult' : formState.applicationOwner
  const needsAdultSupport = effectiveApplicationOwner === 'adult'
  const additionalTeamMembers = getAdditionalTeamMembers(formState, content.form)
  const hasMentor = formState.mentorEnabled === 'yes'
  const isIdeaStage = formState.projectStage === 'idea'
  const hasUploadedProjectVideo = Boolean(formState.projectVideo?.url || formState.projectVideo?.path)
  const hasPendingProjectVideo = Boolean(projectVideoFile)
  const requiresProjectVideoNow = isFilled(formState.projectStage) && !isIdeaStage
  const projectVideoIsRequired =
    requiresProjectVideoNow && !hasUploadedProjectVideo && !hasPendingProjectVideo
  const projectVideoStatusKey = formState.projectVideoStatus || getProjectVideoStatusKey(formState)
  const projectVideoStatusLabel = getProjectVideoStatusLabel(projectVideoStatusKey, content.form)
  const projectReviewStatusLabel =
    reviewStagesById[formState.reviewStage] || content.form.projectStatusFallback
  const projectVideoDeadline = formState.videoFollowUpDeadline
    ? formatSubmissionDate(formState.videoFollowUpDeadline, language)
    : ''
  const selectedStage = content.form.stages.find((stage) => stage.id === formState.projectStage) || null
  const stageFlow = !isFilled(formState.projectStage)
    ? content.form.stageFlow.empty
    : isIdeaStage
      ? content.form.stageFlow.idea
      : content.form.stageFlow.build
  const pitchSectionTitle = isIdeaStage
    ? content.form.sections.pitch.ideaTitle
    : content.form.sections.pitch.buildTitle
  const pitchSectionText = isIdeaStage
    ? content.form.sections.pitch.ideaText
    : content.form.sections.pitch.buildText
  const submitLabel = isIdeaStage
    ? content.form.submitIdea
    : requiresProjectVideoNow
      ? content.form.submitBuild
      : content.form.submit
  const applicationPathMessage = !ageDetails.hasAge
    ? content.form.applicationCard.empty
    : ageDetails.isUnder13
      ? content.form.applicationCard.under13
      : ageDetails.canSelfApply
        ? content.form.applicationCard.teen
        : content.form.feedback.invalidAge
  const contactHelperText = needsAdultSupport
    ? content.form.helpers.contactAdult
    : content.form.helpers.contactSelf
  const savedProjectVideoItems = formState.projectVideo?.url ? [formState.projectVideo] : []
  const savedProjectImageItems = formState.projectImages || []

  const openTrackerPage = (projectIdValue = '') => {
    const resolvedProjectId = String(projectIdValue || projectLookupId || formState.projectId || '')
      .trim()
      .toUpperCase()

    if (!resolvedProjectId) {
      setFeedback(content.form.feedback.projectIdNeeded)
      return
    }

    window.localStorage.setItem(projectTrackerStorageKey, resolvedProjectId)
    onNavigate('tracker')
  }

  const handleProjectVideoFilesChange = (fileList) => {
    setProjectVideoFile(fileList?.[0] || null)
  }

  const handleProjectImageFilesChange = (fileList) => {
    setProjectImageFiles(Array.from(fileList || []))
  }

  const clearSelectedProjectVideo = () => {
    setProjectVideoFile(null)
  }

  const clearSelectedProjectImages = () => {
    setProjectImageFiles([])
  }

  const requiredFieldDefinitions = useMemo(
    () => {
      const fields = [
        { key: 'fullName', label: content.form.fields.fullName, value: formState.fullName },
        { key: 'age', label: content.form.fields.age, value: formState.age },
        {
          key: 'applicationOwner',
          label: content.form.fields.applicationOwner,
          value: effectiveApplicationOwner,
        },
        { key: 'city', label: content.form.fields.city, value: formState.city },
        { key: 'category', label: content.form.fields.category, value: formState.category },
        {
          key: 'projectStage',
          label: content.form.fields.projectStage,
          value: formState.projectStage,
        },
        { key: 'projectName', label: content.form.fields.projectName, value: formState.projectName },
        { key: 'problem', label: content.form.fields.problem, value: formState.problem },
        { key: 'description', label: content.form.fields.description, value: formState.description },
        { key: 'contact', label: content.form.fields.contact, value: formState.contact },
      ]

      if (projectVideoIsRequired) {
        fields.splice(9, 0, {
          key: 'projectVideo',
          label: content.form.fields.projectVideo,
          value: hasUploadedProjectVideo || hasPendingProjectVideo ? 'yes' : '',
        })
      }

      if (needsAdultSupport) {
        fields.splice(3, 0, {
          key: 'adultRole',
          label: content.form.fields.adultRole,
          value: formState.adultRole,
        })
        fields.splice(4, 0, {
          key: 'adultName',
          label: content.form.fields.adultName,
          value: formState.adultName,
        })
      }

      additionalTeamMembers.forEach((member, index) => {
        const insertAt = 5 + index * 4
        fields.splice(
          insertAt,
          0,
          {
            key: member.nameKey,
            label: `${member.title} - ${content.form.fields.fullName}`,
            value: formState[member.nameKey],
          },
          {
            key: member.ageKey,
            label: `${member.title} - ${content.form.fields.age}`,
            value: formState[member.ageKey],
          },
          {
            key: member.cityKey,
            label: `${member.title} - ${content.form.fields.city}`,
            value: formState[member.cityKey],
          },
          {
            key: member.contactKey,
            label: `${member.title} - ${content.form.fields.teamMemberContact}`,
            value: formState[member.contactKey],
          },
        )
      })

      if (hasMentor) {
        fields.splice(6, 0, {
          key: 'mentorName',
          label: content.form.fields.mentorName,
          value: formState.mentorName,
        })
      }

      return fields
    },
    [
      additionalTeamMembers,
      content.form.fields,
      effectiveApplicationOwner,
      formState.adultName,
      formState.adultRole,
      formState.age,
      formState.category,
      formState.city,
      formState.contact,
      formState.description,
      formState.fullName,
      formState.mentorName,
      formState.problem,
      formState.projectName,
      formState.projectStage,
      formState.teamMemberThreeAge,
      formState.teamMemberThreeCity,
      formState.teamMemberThreeContact,
      formState.teamMemberThreeName,
      formState.teamMemberTwoAge,
      formState.teamMemberTwoCity,
      formState.teamMemberTwoContact,
      formState.teamMemberTwoName,
      hasMentor,
      hasPendingProjectVideo,
      hasUploadedProjectVideo,
      needsAdultSupport,
      projectVideoIsRequired,
    ],
  )
  const missingRequiredFields = requiredFieldDefinitions.filter(({ value }) => !isFilled(value))
  const filledCount = requiredFieldDefinitions.length - missingRequiredFields.length
  const progress = Math.round((filledCount / requiredFieldDefinitions.length) * 100)
  const readyForSummary = missingRequiredFields.length === 0

  const basicsStepFields = [
    { key: 'fullName', label: content.form.fields.fullName, value: formState.fullName },
    { key: 'age', label: content.form.fields.age, value: formState.age },
    {
      key: 'applicationOwner',
      label: content.form.fields.applicationOwner,
      value: effectiveApplicationOwner,
    },
    { key: 'city', label: content.form.fields.city, value: formState.city },
    ...(needsAdultSupport
      ? [
          {
            key: 'adultRole',
            label: content.form.fields.adultRole,
            value: formState.adultRole,
          },
          {
            key: 'adultName',
            label: content.form.fields.adultName,
            value: formState.adultName,
          },
        ]
      : []),
    { key: 'teamType', label: content.form.fields.teamType, value: formState.teamType },
    ...additionalTeamMembers.flatMap((member) => [
      {
        key: member.nameKey,
        label: `${member.title} - ${content.form.fields.fullName}`,
        value: formState[member.nameKey],
      },
      {
        key: member.ageKey,
        label: `${member.title} - ${content.form.fields.age}`,
        value: formState[member.ageKey],
      },
      {
        key: member.cityKey,
        label: `${member.title} - ${content.form.fields.city}`,
        value: formState[member.cityKey],
      },
      {
        key: member.contactKey,
        label: `${member.title} - ${content.form.fields.teamMemberContact}`,
        value: formState[member.contactKey],
      },
    ]),
    ...(hasMentor
      ? [
          {
            key: 'mentorName',
            label: content.form.fields.mentorName,
            value: formState.mentorName,
          },
        ]
      : []),
  ]

  const setupStepFields = [
    { key: 'category', label: content.form.fields.category, value: formState.category },
    {
      key: 'projectStage',
      label: content.form.fields.projectStage,
      value: formState.projectStage,
    },
  ]

  const storyStepFields = [
    { key: 'projectName', label: content.form.fields.projectName, value: formState.projectName },
    { key: 'problem', label: content.form.fields.problem, value: formState.problem },
    { key: 'description', label: content.form.fields.description, value: formState.description },
  ]

  const pitchStepFields = [
    ...(projectVideoIsRequired
      ? [
          {
            key: 'projectVideo',
            label: content.form.fields.projectVideo,
            value: hasUploadedProjectVideo || hasPendingProjectVideo ? 'yes' : '',
          },
        ]
      : []),
    { key: 'contact', label: content.form.fields.contact, value: formState.contact },
  ]

  const stepMissingFields = [
    basicsStepFields.filter(({ value }) => !isFilled(value)),
    setupStepFields.filter(({ value }) => !isFilled(value)),
    storyStepFields.filter(({ value }) => !isFilled(value)),
    pitchStepFields.filter(({ value }) => !isFilled(value)),
  ]

  const stepCompletion = [
    stepMissingFields[0].length === 0 && ageDetails.isEligible,
    stepMissingFields[1].length === 0,
    stepMissingFields[2].length === 0,
    stepMissingFields[3].length === 0,
  ]
  const firstIncompleteStepIndex = stepCompletion.findIndex((item) => !item)
  const stepDefinitions = [
    {
      key: 'basics',
      ...content.form.sections.basics,
      milestone: content.form.milestones[0],
    },
    {
      key: 'setup',
      ...content.form.sections.setup,
      milestone: content.form.milestones[1],
    },
    {
      key: 'story',
      ...content.form.sections.story,
      milestone: content.form.milestones[2],
    },
    {
      key: 'pitch',
      ...content.form.sections.pitch,
      milestone: content.form.milestones[3],
    },
  ]
  const currentStep = stepDefinitions[activeStepIndex]
  const currentStepMissingFields = stepMissingFields[activeStepIndex]
  const currentStepComplete = stepCompletion[activeStepIndex]
  const lastStepIndex = stepDefinitions.length - 1
  const isLastStep = activeStepIndex === lastStepIndex

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => {
      const nextState = { ...current, [name]: value }

      if (name === 'age') {
        const nextAgeDetails = getAgeDetails(value)

        if (!nextAgeDetails.hasAge) {
          nextState.applicationOwner = ''
        } else if (nextAgeDetails.isUnder13) {
          nextState.applicationOwner = 'adult'
        } else if (!current.applicationOwner) {
          nextState.applicationOwner = 'self'
        }
      }

      return nextState
    })
  }

  const updateField = (name, value) => {
    setFormState((current) => {
      const nextState = { ...current, [name]: value }

      if (name === 'applicationOwner' && getAgeDetails(current.age).isUnder13) {
        nextState.applicationOwner = 'adult'
      }

      if (name === 'mentorEnabled' && value === 'no') {
        nextState.mentorName = ''
        nextState.mentorContact = ''
      }

      if (name === 'teamType' && value === 'solo') {
        nextState.teamMemberTwoName = ''
        nextState.teamMemberTwoAge = ''
        nextState.teamMemberTwoCity = ''
        nextState.teamMemberTwoContact = ''
        nextState.teamMemberThreeName = ''
        nextState.teamMemberThreeAge = ''
        nextState.teamMemberThreeCity = ''
        nextState.teamMemberThreeContact = ''
      }

      if (name === 'teamType' && value === 'duo') {
        nextState.teamMemberThreeName = ''
        nextState.teamMemberThreeAge = ''
        nextState.teamMemberThreeCity = ''
        nextState.teamMemberThreeContact = ''
      }

      return nextState
    })
  }

  const handleOpenStep = (index) => {
    const isUnlocked = index === 0 || stepCompletion.slice(0, index).every(Boolean)

    if (!isUnlocked) {
      return
    }

    setActiveStepIndex(index)
    setFeedback('')
  }

  const handleNextStep = () => {
    setShowValidation(true)

    if (activeStepIndex === 0 && ageDetails.hasAge && !ageDetails.isEligible) {
      setFeedback(content.form.feedback.invalidAge)
      return
    }

    if (!currentStepComplete) {
      setFeedback(content.form.feedback.completeRequired)
      return
    }

    setFeedback('')
    setShowValidation(false)
    setActiveStepIndex((current) => Math.min(current + 1, lastStepIndex))
  }

  const handlePreviousStep = () => {
    setFeedback('')
    setActiveStepIndex((current) => Math.max(current - 1, 0))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setShowValidation(true)

    if (firstIncompleteStepIndex !== -1) {
      setActiveStepIndex(firstIncompleteStepIndex)
    }

    if (missingRequiredFields.length > 0) {
      setFeedback(content.form.feedback.completeRequired)
      return
    }

    if (!ageDetails.isEligible) {
      setFeedback(content.form.feedback.invalidAge)
      return
    }

    const nextFormState = {
      ...formState,
      applicationOwner: effectiveApplicationOwner,
    }
    const payload = new FormData()

    persistedFormFields.forEach((field) => {
      payload.append(field, String(nextFormState[field] ?? ''))
    })

    if (projectVideoFile) {
      payload.append('projectVideo', projectVideoFile)
    }

    projectImageFiles.forEach((file) => {
      payload.append('projectImages', file)
    })

    setIsSubmitting(true)
    setFeedback(apiMessages.submitting)

    try {
      const savedSubmission = await submitApplication(payload)
      const savedProjectId = savedSubmission.projectId || savedSubmission.submissionId

      setFormState({
        ...initialFormState,
        ...savedSubmission,
        applicationOwner: effectiveApplicationOwner,
      })
      setProjectLookupId(savedProjectId)
      setProjectVideoFile(null)
      setProjectImageFiles([])
      setShowValidation(false)
      window.localStorage.setItem(projectTrackerStorageKey, savedProjectId)
      setFeedback('')
      setSubmissionSuccess({
        projectId: savedProjectId,
        reviewStatus:
          reviewStagesById[savedSubmission.reviewStage] || content.form.projectStatusFallback,
        title:
          savedSubmission.projectStage === 'idea' && !savedSubmission.projectVideo?.url
            ? trackerPageCopy.savedIdeaTitle
            : trackerPageCopy.savedBuildTitle,
        body:
          savedSubmission.projectStage === 'idea' && !savedSubmission.projectVideo?.url
            ? trackerPageCopy.savedIdeaBody
            : trackerPageCopy.savedBuildBody,
        steps:
          savedSubmission.projectStage === 'idea' && !savedSubmission.projectVideo?.url
            ? trackerPageCopy.ideaSteps
            : trackerPageCopy.buildSteps,
      })
    } catch (error) {
      setFeedback(error.message || apiMessages.failed)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormState(initialFormState)
    setProjectLookupId('')
    setProjectVideoFile(null)
    setProjectImageFiles([])
    setShowValidation(false)
    setActiveStepIndex(0)
    setSubmissionSuccess(null)
    setFeedback(content.form.feedback.cleared)
    window.localStorage.removeItem(routeStorageKey)
  }

  return (
    <div className="form-shell form-shell--enhanced">
      <form className="application-form" onSubmit={handleSubmit} noValidate>
        <div className="form-header">
          <span className="card-eyebrow">{content.form.eyebrow}</span>
          <h2>{content.form.title}</h2>
          <p>{content.form.text}</p>

          <div className="application-guide">
            {content.form.infoPills.map((item) => (
              <span key={item} className="guide-pill">
                {item}
              </span>
            ))}
          </div>

          <div className="save-status">{content.form.saveNote}</div>

          <div className="project-tracker-card">
            <div className="project-tracker-card__copy">
              <strong>{content.form.projectTrackerTitle}</strong>
              <p>{content.form.projectTrackerText}</p>
            </div>
            <div className="project-tracker-card__actions">
              <input
                value={projectLookupId}
                onChange={(event) => setProjectLookupId(event.target.value)}
                placeholder={content.form.placeholders.projectId}
                aria-label={content.form.fields.projectId}
              />
              <button
                type="button"
                className="secondary-button"
                onClick={() => openTrackerPage(projectLookupId)}
              >
                {trackerPageCopy.openTracker}
              </button>
            </div>
            <small className="field-helper">{trackerPageCopy.trackerHint}</small>
          </div>

          {isFilled(formState.projectId) ? (
            <div className="tracking-banner">
              <div>
                <span>{content.form.fields.projectId}</span>
                <strong>{formState.projectId}</strong>
              </div>
              <div>
                <span>{content.form.fields.projectStatus}</span>
                <strong>{projectReviewStatusLabel}</strong>
              </div>
              <div>
                <span>{content.form.fields.projectVideoStatus}</span>
                <strong>{projectVideoStatusLabel}</strong>
              </div>
              {projectVideoDeadline ? (
                <div>
                  <span>{content.form.followUpDeadlineLabel}</span>
                  <strong>{projectVideoDeadline}</strong>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="progress-card">
          <div className="progress-copy">
            <strong>{content.form.progressLabel}</strong>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="wizard-step-row">
            {stepDefinitions.map((step, index) => (
              <button
                key={step.key}
                type="button"
                className={`wizard-step-chip ${
                  activeStepIndex === index ? 'is-active' : stepCompletion[index] ? 'is-complete' : ''
                }`}
                onClick={() => handleOpenStep(index)}
                disabled={index !== 0 && !stepCompletion.slice(0, index).every(Boolean)}
              >
                <span className="wizard-step-chip__count">{step.step}</span>
                <strong>{step.milestone}</strong>
              </button>
            ))}
          </div>
          <div className="progress-focus">
            <span>{content.form.currentStepLabel}</span>
            <strong>{currentStep.title}</strong>
            <p>{currentStep.text}</p>
          </div>

          {readyForSummary ? (
            <div className="completion-banner">
              <strong>{content.form.readyTitle}</strong>
              <p>{content.form.readyText}</p>
            </div>
          ) : currentStepComplete ? (
            <div className="completion-banner">
              <strong>{currentStep.milestone}</strong>
              <p>{content.form.nextStepReady}</p>
            </div>
          ) : (
            <div className="missing-block">
              <strong>{content.form.missingTitle}</strong>
              <div className="missing-chip-row">
                {currentStepMissingFields.map((item) => (
                  <span key={item.key} className="missing-chip">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {activeStepIndex === 0 ? (
          <FormSection
            step={content.form.sections.basics.step}
            title={content.form.sections.basics.title}
            text={content.form.sections.basics.text}
          >
            <div className="field-grid">
              <Field
                label={content.form.fields.fullName}
                name="fullName"
                value={formState.fullName}
                onChange={handleChange}
                placeholder={content.form.placeholders.fullName}
                required
                invalid={showValidation && !isFilled(formState.fullName)}
              />
              <Field
                label={content.form.fields.age}
                name="age"
                type="number"
                value={formState.age}
                onChange={handleChange}
                min="8"
                max="17"
                placeholder={content.form.placeholders.age}
                required
                invalid={showValidation && !isFilled(formState.age)}
              />
              <Field
                label={content.form.fields.city}
                name="city"
                value={formState.city}
                onChange={handleChange}
                placeholder={content.form.placeholders.city}
                required
                invalid={showValidation && !isFilled(formState.city)}
              />
              <Field
                label={content.form.fields.school}
                name="school"
                value={formState.school}
                onChange={handleChange}
                placeholder={content.form.placeholders.school}
                optionalText={content.form.optionalLabel}
              />
            </div>

            <article
              className={`age-path-card ${
                ageDetails.isUnder13 ? 'is-under13' : ageDetails.canSelfApply ? 'is-open' : ''
              }`}
            >
              <span className="card-eyebrow">{content.form.applicationCard.eyebrow}</span>
              <strong>{content.form.applicationCard.title}</strong>
              <p>{applicationPathMessage}</p>
              <div className="age-path-card__chips">
                <span className="age-path-chip">{content.form.applicationCard.team}</span>
              </div>
            </article>

            <div
              className={`selection-block selection-block--soft ${
                showValidation && !isFilled(effectiveApplicationOwner) ? 'has-error' : ''
              }`}
            >
              <div className="selection-heading selection-heading--stacked">
                <div>
                  <strong>{content.form.fields.applicationOwner}</strong>
                  <p>{content.form.applicationCard.title}</p>
                </div>
              </div>
              <div className="stage-row">
                {content.form.applicationPaths.map((path) => (
                  <button
                    key={path.id}
                    type="button"
                    className={`stage-chip ${
                      effectiveApplicationOwner === path.id ? 'is-selected' : ''
                    }`}
                    aria-pressed={effectiveApplicationOwner === path.id}
                    onClick={() => updateField('applicationOwner', path.id)}
                    disabled={path.id === 'self' && ageDetails.isUnder13}
                  >
                    {path.label}
                  </button>
                ))}
              </div>
            </div>

            {needsAdultSupport ? (
              <div className="selection-block selection-block--accent">
                <div className="selection-heading selection-heading--stacked">
                  <div>
                    <strong>{content.form.adultCardTitle}</strong>
                    <p>{content.form.adultCardText}</p>
                  </div>
                </div>
                <div className="field-grid">
                  <Field
                    label={content.form.fields.adultRole}
                    name="adultRole"
                    value={formState.adultRole}
                    onChange={handleChange}
                    placeholder={content.form.placeholders.adultRole}
                    helper={content.form.helpers.adultRole}
                    required
                    invalid={showValidation && !isFilled(formState.adultRole)}
                  />
                  <Field
                    label={content.form.fields.adultName}
                    name="adultName"
                    value={formState.adultName}
                    onChange={handleChange}
                    placeholder={content.form.placeholders.adultName}
                    required
                    invalid={showValidation && !isFilled(formState.adultName)}
                  />
                </div>
              </div>
            ) : null}

            <div className="selection-block selection-block--soft">
              <div className="selection-heading selection-heading--stacked">
                <div>
                  <strong>{content.form.fields.teamType}</strong>
                  <p>{content.form.teamHint}</p>
                </div>
              </div>
              <div className="stage-row">
                {content.form.teamModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    className={`stage-chip ${formState.teamType === mode.id ? 'is-selected' : ''}`}
                    aria-pressed={formState.teamType === mode.id}
                    onClick={() => updateField('teamType', mode.id)}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {additionalTeamMembers.length ? (
                <div className="team-member-stack">
                  <p className="team-member-stack__intro">{content.form.teamMemberCards.intro}</p>
                  {additionalTeamMembers.map((member) => (
                    <article key={member.id} className="team-member-card">
                      <div className="team-member-card__head">
                        <strong>{member.title}</strong>
                      </div>
                      <div className="field-grid">
                        <Field
                          label={content.form.fields.fullName}
                          name={member.nameKey}
                          value={formState[member.nameKey]}
                          onChange={handleChange}
                          placeholder={content.form.placeholders.fullName}
                          required
                          invalid={showValidation && !isFilled(formState[member.nameKey])}
                        />
                        <Field
                          label={content.form.fields.age}
                          name={member.ageKey}
                          type="number"
                          value={formState[member.ageKey]}
                          onChange={handleChange}
                          min="8"
                          max="17"
                          placeholder={content.form.placeholders.age}
                          required
                          invalid={showValidation && !isFilled(formState[member.ageKey])}
                        />
                        <Field
                          label={content.form.fields.city}
                          name={member.cityKey}
                          value={formState[member.cityKey]}
                          onChange={handleChange}
                          placeholder={content.form.placeholders.city}
                          required
                          invalid={showValidation && !isFilled(formState[member.cityKey])}
                        />
                        <Field
                          label={content.form.fields.teamMemberContact}
                          name={member.contactKey}
                          type="tel"
                          value={formState[member.contactKey]}
                          onChange={handleChange}
                          placeholder={content.form.placeholders.teamMemberContact}
                          helper={content.form.helpers.teamMemberContact}
                          required
                          invalid={showValidation && !isFilled(formState[member.contactKey])}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="selection-block selection-block--soft">
              <div className="selection-heading selection-heading--stacked">
                <div>
                  <strong>{content.form.mentorToggleTitle}</strong>
                  <p>{content.form.mentorToggleText}</p>
                </div>
              </div>
              <div className="stage-row">
                {content.form.mentorChoices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    className={`stage-chip ${
                      formState.mentorEnabled === choice.id ? 'is-selected' : ''
                    }`}
                    aria-pressed={formState.mentorEnabled === choice.id}
                    onClick={() => updateField('mentorEnabled', choice.id)}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>

              {hasMentor ? (
                <div className="mentor-fields">
                  <div className="selection-heading selection-heading--stacked">
                    <div>
                      <strong>{content.form.mentorCardTitle}</strong>
                      <p>{content.form.mentorCardText}</p>
                    </div>
                  </div>
                  <div className="field-grid">
                    <Field
                      label={content.form.fields.mentorName}
                      name="mentorName"
                      value={formState.mentorName}
                      onChange={handleChange}
                      placeholder={content.form.placeholders.mentorName}
                      required
                      invalid={showValidation && !isFilled(formState.mentorName)}
                    />
                    <Field
                      label={content.form.fields.mentorContact}
                      name="mentorContact"
                      value={formState.mentorContact}
                      onChange={handleChange}
                      placeholder={content.form.placeholders.mentorContact}
                      helper={content.form.helpers.mentorContact}
                      optionalText={content.form.optionalLabel}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </FormSection>
        ) : null}

        {activeStepIndex === 1 ? (
          <FormSection
            step={content.form.sections.setup.step}
            title={content.form.sections.setup.title}
            text={content.form.sections.setup.text}
          >
            <div
              className={`selection-block ${
                showValidation && !isFilled(formState.category) ? 'has-error' : ''
              }`}
            >
              <div className="selection-heading">
                <strong>{content.form.fields.category}</strong>
              </div>
              <div className="category-grid">
                {content.form.categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`category-card ${
                      formState.category === category.id ? 'is-selected' : ''
                    }`}
                    aria-pressed={formState.category === category.id}
                    onClick={() => updateField('category', category.id)}
                  >
                    <strong>{category.label}</strong>
                    <span>{category.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`selection-block ${
                showValidation && !isFilled(formState.projectStage) ? 'has-error' : ''
              }`}
            >
              <div className="selection-heading">
                <strong>{content.form.fields.projectStage}</strong>
              </div>
              <div className="stage-row">
                {content.form.stages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    className={`stage-chip ${
                      formState.projectStage === stage.id ? 'is-selected' : ''
                    }`}
                    aria-pressed={formState.projectStage === stage.id}
                    onClick={() => updateField('projectStage', stage.id)}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </div>

            <article
              className={`stage-flow-card ${
                isFilled(formState.projectStage) ? 'stage-flow-card--selected' : ''
              } ${isIdeaStage ? 'stage-flow-card--idea' : requiresProjectVideoNow ? 'stage-flow-card--build' : ''}`}
            >
              <span className="card-eyebrow">{content.form.stageFlow.eyebrow}</span>
              <strong>
                {selectedStage
                  ? `${selectedStage.label}: ${stageFlow.title}`
                  : stageFlow.title}
              </strong>
              <p>{stageFlow.text}</p>
              {stageFlow.steps?.length ? (
                <div className="stage-flow-list">
                  {stageFlow.steps.map((step) => (
                    <div key={step} className="stage-flow-step">
                      <span aria-hidden="true" />
                      <strong>{step}</strong>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="stage-flow-project-note">
                <span>{content.form.fields.projectId}</span>
                <strong>
                  {formState.projectId
                    ? formState.projectId
                    : content.form.stageFlow.projectIdPending}
                </strong>
                {formState.projectId ? (
                  <>
                    <span>{content.form.fields.projectStatus}</span>
                    <strong>{projectReviewStatusLabel}</strong>
                  </>
                ) : null}
              </div>
            </article>
          </FormSection>
        ) : null}

        {activeStepIndex === 2 ? (
          <FormSection
            step={content.form.sections.story.step}
            title={content.form.sections.story.title}
            text={content.form.sections.story.text}
          >
            <div className="field-grid">
              <Field
                label={content.form.fields.projectName}
                name="projectName"
                value={formState.projectName}
                onChange={handleChange}
                placeholder={content.form.placeholders.projectName}
                required
                invalid={showValidation && !isFilled(formState.projectName)}
              />

              <div className={`field ${showValidation && !isFilled(formState.problem) ? 'is-invalid' : ''}`}>
                <div className="field-label">
                  <strong>{content.form.fields.problem}</strong>
                </div>
                <input
                  name="problem"
                  value={formState.problem}
                  onChange={handleChange}
                  placeholder={content.form.placeholders.problem}
                  aria-invalid={showValidation && !isFilled(formState.problem)}
                  required
                />
                <small className="field-helper">{content.form.helpers.problem}</small>
              </div>
            </div>

            <div className="field-grid">
              <div
                className={`field field--full ${
                  showValidation && !isFilled(formState.description) ? 'is-invalid' : ''
                }`}
              >
                <div className="field-label">
                  <strong>{content.form.fields.description}</strong>
                </div>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder={content.form.placeholders.description}
                  aria-invalid={showValidation && !isFilled(formState.description)}
                  required
                />
                <div className="field-meta">
                  <small className="field-helper">{content.form.helpers.description}</small>
                  <small>{formState.description.trim().length}</small>
                </div>
              </div>
            </div>

            <div className="prompt-block">
              <p className="prompt-block__title">{content.form.ideaPromptTitle}</p>
              <div className="prompt-grid">
                {content.form.ideaPrompts.map((item) => (
                  <article key={item.title} className="prompt-card">
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </FormSection>
        ) : null}

        {activeStepIndex === 3 ? (
          <FormSection
            step={content.form.sections.pitch.step}
            title={pitchSectionTitle}
            text={pitchSectionText}
          >
            {requiresProjectVideoNow ? (
              <>
                <div className="field-grid field-grid--stacked">
                  <FileUploadField
                    label={content.form.fields.projectVideo}
                    helper={content.form.helpers.projectVideoRequired}
                    accept="video/*"
                    invalid={showValidation && projectVideoIsRequired}
                    requiredText={content.form.requiredLabel}
                    actionLabel={content.form.uploadVideoAction}
                    replaceLabel={content.form.replaceVideoAction}
                    clearLabel={content.form.clearSelectedVideo}
                    emptyStateText={content.form.uploadVideoEmpty}
                    selectedFiles={projectVideoFile ? [projectVideoFile] : []}
                    savedItems={savedProjectVideoItems}
                    savedLabel={content.form.savedVideoLabel}
                    onFilesChange={handleProjectVideoFilesChange}
                    onClear={clearSelectedProjectVideo}
                  />

                  <Field
                    label={content.form.fields.contact}
                    name="contact"
                    value={formState.contact}
                    onChange={handleChange}
                    placeholder={content.form.placeholders.contact}
                    helper={contactHelperText}
                    required
                    invalid={showValidation && !isFilled(formState.contact)}
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
                    onFilesChange={handleProjectImageFilesChange}
                    onClear={clearSelectedProjectImages}
                  />
                </div>
              </>
            ) : (
              <>
                <article className="upload-guidance-card upload-guidance-card--idea">
                  <strong>{content.form.ideaStageUploadTitle}</strong>
                  <p>{content.form.ideaStageUploadText}</p>
                  <div className="stage-flow-list">
                    {content.form.ideaStageFollowUpSteps.map((step) => (
                      <div key={step} className="stage-flow-step">
                        <span aria-hidden="true" />
                        <strong>{step}</strong>
                      </div>
                    ))}
                  </div>
                </article>

                <div className="field-grid">
                  <Field
                    label={content.form.fields.contact}
                    name="contact"
                    value={formState.contact}
                    onChange={handleChange}
                    placeholder={content.form.placeholders.contact}
                    helper={contactHelperText}
                    required
                    invalid={showValidation && !isFilled(formState.contact)}
                  />
                  <Field
                    label={content.form.fields.projectLink}
                    name="projectLink"
                    type="url"
                    value={formState.projectLink}
                    onChange={handleChange}
                    placeholder={content.form.placeholders.projectLink}
                    helper={content.form.helpers.projectLink}
                    optionalText={content.form.optionalLabel}
                  />
                </div>
              </>
            )}

            {requiresProjectVideoNow ? (
              <div className="field-grid">
                <Field
                  label={content.form.fields.projectLink}
                  name="projectLink"
                  type="url"
                  value={formState.projectLink}
                  onChange={handleChange}
                  placeholder={content.form.placeholders.projectLink}
                  helper={content.form.helpers.projectLink}
                  optionalText={content.form.optionalLabel}
                />
              </div>
            ) : null}

            {requiresProjectVideoNow ? (
              <article className="upload-guidance-card">
                <strong>{content.form.videoPolicyTitle}</strong>
                <p>{content.form.videoPolicyText}</p>
              </article>
            ) : (
              <article className="upload-guidance-card upload-guidance-card--follow-up">
                <strong>{content.form.followUpProjectIdTitle}</strong>
                <p>
                  {isFilled(formState.projectId)
                    ? `${content.form.fields.projectId}: ${formState.projectId}`
                    : content.form.followUpProjectIdText}
                </p>
              </article>
            )}

            {hasUploadedProjectVideo || formState.projectImages?.length ? (
              <SavedProjectMedia
                content={content}
                formState={formState}
                language={language}
                projectVideoStatusLabel={projectVideoStatusLabel}
              />
            ) : null}
          </FormSection>
        ) : null}

        <div className="wizard-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={handlePreviousStep}
            disabled={activeStepIndex === 0}
          >
            {content.form.back}
          </button>
          {isLastStep ? (
            <button type="submit" className="primary-button" disabled={isSubmitting}>
              {isSubmitting ? apiMessages.submitting : submitLabel}
            </button>
          ) : (
            <button type="button" className="primary-button" onClick={handleNextStep}>
              {content.form.next}
            </button>
          )}
        </div>

        <div className="wizard-footer">
          <button type="button" className="ghost-button ghost-button--soft" onClick={handleReset}>
            {content.form.reset}
          </button>
          <span>
            {currentStep.step} / {stepDefinitions.length}
          </span>
        </div>

        {feedback ? <p className="form-feedback">{feedback}</p> : null}
      </form>

      {submissionSuccess ? (
        <SubmissionSuccessModal
          content={trackerPageCopy}
          submissionSuccess={submissionSuccess}
          projectIdLabel={content.form.fields.projectId}
          projectStatusLabel={content.form.fields.projectStatus}
          onClose={() => setSubmissionSuccess(null)}
          onOpenTracker={() => {
            openTrackerPage(submissionSuccess.projectId)
            setSubmissionSuccess(null)
          }}
        />
      ) : null}
    </div>
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

export function Field({ label, helper, optionalText, invalid = false, ...props }) {
  return (
    <label className={`field ${invalid ? 'is-invalid' : ''}`}>
      <div className="field-label">
        <strong>{label}</strong>
        {optionalText ? <small>{optionalText}</small> : null}
      </div>
      <input {...props} aria-invalid={invalid || undefined} />
      {helper ? <small className="field-helper">{helper}</small> : null}
    </label>
  )
}

export function FileUploadField({
  label,
  helper,
  optionalText,
  invalid = false,
  requiredText,
  actionLabel,
  replaceLabel,
  clearLabel,
  emptyStateText,
  savedLabel,
  selectedFiles = [],
  savedItems = [],
  accept,
  multiple = false,
  limitNote = '',
  onFilesChange,
  onClear,
}) {
  const inputId = useId()
  const inputRef = useRef(null)
  const hasSelectedFiles = selectedFiles.length > 0
  const hasSavedItems = savedItems.length > 0
  const actionCopy = hasSelectedFiles || hasSavedItems ? replaceLabel : actionLabel

  return (
    <div className={`upload-field ${invalid ? 'is-invalid' : ''}`}>
      <div className="field-label">
        <strong>{label}</strong>
        {requiredText ? <small>{requiredText}</small> : optionalText ? <small>{optionalText}</small> : null}
      </div>

      <label htmlFor={inputId} className={`upload-field__dropzone ${hasSelectedFiles ? 'has-selection' : ''}`}>
        <input
          id={inputId}
          ref={inputRef}
          className="upload-field__input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(event) => onFilesChange(event.target.files)}
        />
        <div className="upload-field__copy">
          <strong>{actionCopy}</strong>
          <p>{emptyStateText}</p>
        </div>
        <span className="upload-field__action">{actionCopy}</span>
      </label>

      {helper ? <small className="field-helper">{helper}</small> : null}
      {limitNote ? <small className="field-helper">{limitNote}</small> : null}

      {hasSavedItems ? (
        <div className="upload-field__saved">
          <span>{savedLabel}</span>
          <strong>
            {savedItems.length === 1
              ? savedItems[0].originalName || savedItems[0].url || savedLabel
              : `${savedItems.length} ${savedLabel}`}
          </strong>
        </div>
      ) : null}

      {hasSelectedFiles ? (
        <div className="selected-file-list">
          {selectedFiles.map((file) => (
            <span key={`${file.name}-${file.size}`} className="selected-file-chip">
              {file.name}
              <small>{formatFileSize(file.size)}</small>
            </span>
          ))}
        </div>
      ) : null}

      {hasSelectedFiles ? (
        <button
          type="button"
          className="upload-field__clear"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = ''
            }

            onClear()
          }}
        >
          {clearLabel}
        </button>
      ) : null}
    </div>
  )
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 KB'
  }

  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export function SavedProjectMedia({ content, formState, language, projectVideoStatusLabel }) {
  return (
    <article className="saved-project-media">
      <div className="saved-project-media__head">
        <div>
          <strong>{content.form.savedMediaTitle}</strong>
          <p>{content.form.savedMediaText}</p>
        </div>
        <span className="saved-project-media__status">{projectVideoStatusLabel}</span>
      </div>

      {formState.projectVideo?.url ? (
        <div className="saved-project-media__video">
          <video controls preload="metadata" src={formState.projectVideo.url} />
          <a href={formState.projectVideo.url} target="_blank" rel="noreferrer">
            {language === 'ar'
              ? formState.projectVideo.originalName || content.form.openUploadedVideo
              : formState.projectVideo.originalName || content.form.openUploadedVideo}
          </a>
        </div>
      ) : null}

      {formState.projectImages?.length ? (
        <div className="saved-project-media__images">
          {formState.projectImages.map((image) => (
            <a
              key={image.url}
              href={image.url}
              target="_blank"
              rel="noreferrer"
              className="saved-project-media__image"
            >
              <img src={image.url} alt={image.originalName || content.form.fields.projectImages} />
            </a>
          ))}
        </div>
      ) : null}
    </article>
  )
}

function SubmissionSuccessModal({
  content,
  submissionSuccess,
  projectIdLabel,
  projectStatusLabel,
  onClose,
  onOpenTracker,
}) {
  return (
    <div className="success-modal" role="dialog" aria-modal="true" aria-labelledby="submission-success-title">
      <div className="success-modal__panel">
        <button type="button" className="success-modal__close" onClick={onClose} aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>

        <span className="card-eyebrow">{submissionSuccess.reviewStatus}</span>
        <h3 id="submission-success-title">{submissionSuccess.title}</h3>
        <p>{submissionSuccess.body}</p>

        <div className="success-modal__summary">
          <div>
            <span>{projectIdLabel}</span>
            <strong>{submissionSuccess.projectId}</strong>
          </div>
          <div>
            <span>{projectStatusLabel}</span>
            <strong>{submissionSuccess.reviewStatus}</strong>
          </div>
        </div>

        <div className="success-modal__steps">
          <strong>{content.nextStepsLabel}</strong>
          <div className="stage-flow-list">
            {submissionSuccess.steps.map((step) => (
              <div key={step} className="stage-flow-step">
                <span aria-hidden="true" />
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="success-modal__actions">
          <button type="button" className="primary-button" onClick={onOpenTracker}>
            {content.openTrackerAction}
          </button>
          <button type="button" className="secondary-button" onClick={onClose}>
            {content.stayHereAction}
          </button>
        </div>
      </div>
    </div>
  )
}
