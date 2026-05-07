import { useEffect, useMemo, useState } from 'react'
import {
  initialFormState,
  routeStorageKey,
} from '../../config/appConfig'
import {
  createSubmissionId,
  getAdditionalTeamMembers,
  getAgeDetails,
  isFilled,
  readStoredJson,
} from '../../utils/appUtils'
import { submitApplication } from '../../utils/apiClient'

export default function ApplicationForm({ content, language }) {
  const [formState, setFormState] = useState(() => {
    return { ...initialFormState, ...readStoredJson(routeStorageKey, initialFormState) }
  })
  const [feedback, setFeedback] = useState('')
  const [showValidation, setShowValidation] = useState(false)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const apiMessages =
    language === 'ar'
      ? {
          submitting: 'جارٍ إرسال الطلب...',
          failed: 'تعذر حفظ الطلب في الخادم الآن. تأكد من تشغيل الباك إند ثم حاول مرة أخرى.',
        }
      : {
          submitting: 'Saving your submission...',
          failed: 'The submission could not be saved to the server right now. Make sure the backend is running, then try again.',
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
  const ageDetails = getAgeDetails(formState.age)
  const effectiveApplicationOwner = ageDetails.isUnder13 ? 'adult' : formState.applicationOwner
  const needsAdultSupport = effectiveApplicationOwner === 'adult'
  const additionalTeamMembers = getAdditionalTeamMembers(formState, content.form)
  const hasMentor = formState.mentorEnabled === 'yes'
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
        {
          key: 'recordingLink',
          label: content.form.fields.recordingLink,
          value: formState.recordingLink,
        },
        { key: 'contact', label: content.form.fields.contact, value: formState.contact },
      ]

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
      content.form.fields,
      effectiveApplicationOwner,
      formState.age,
      formState.adultName,
      formState.adultRole,
      formState.category,
      formState.city,
      formState.contact,
      formState.description,
      formState.fullName,
      formState.mentorName,
      formState.problem,
      formState.projectName,
      formState.projectStage,
      formState.recordingLink,
      formState.teamMemberTwoName,
      formState.teamMemberTwoAge,
      formState.teamMemberTwoCity,
      formState.teamMemberTwoContact,
      formState.teamMemberThreeName,
      formState.teamMemberThreeAge,
      formState.teamMemberThreeCity,
      formState.teamMemberThreeContact,
      additionalTeamMembers,
      hasMentor,
      needsAdultSupport,
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
    {
      key: 'recordingLink',
      label: content.form.fields.recordingLink,
      value: formState.recordingLink,
    },
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

    const submissionId = formState.submissionId || createSubmissionId()
    const nextFormState = {
      ...formState,
      submissionId,
      applicationOwner: effectiveApplicationOwner,
    }
    setIsSubmitting(true)
    setFeedback(apiMessages.submitting)

    try {
      const savedSubmission = await submitApplication(nextFormState)

      setFormState((current) => ({
        ...current,
        submissionId: savedSubmission.id,
        applicationOwner: effectiveApplicationOwner,
      }))
      setShowValidation(false)
      setFeedback(content.form.feedback.prepared)
    } catch (error) {
      setFeedback(error.message || apiMessages.failed)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormState(initialFormState)
    setShowValidation(false)
    setActiveStepIndex(0)
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
            title={content.form.sections.pitch.title}
            text={content.form.sections.pitch.text}
          >
            <div className="field-grid">
              <div
                className={`field ${
                  showValidation && !isFilled(formState.recordingLink) ? 'is-invalid' : ''
                }`}
              >
                <div className="field-label">
                  <strong>{content.form.fields.recordingLink}</strong>
                </div>
                <input
                  name="recordingLink"
                  type="url"
                  value={formState.recordingLink}
                  onChange={handleChange}
                  placeholder={content.form.placeholders.recordingLink}
                  aria-invalid={showValidation && !isFilled(formState.recordingLink)}
                  required
                />
                <small className="field-helper">{content.form.helpers.recordingLink}</small>
              </div>

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
              {isSubmitting ? apiMessages.submitting : content.form.submit}
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

function Field({ label, helper, optionalText, invalid = false, ...props }) {
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
