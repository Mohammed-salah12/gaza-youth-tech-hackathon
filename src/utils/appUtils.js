import {
  defaultReviewStage,
  languageStorageKey,
  submissionsStorageKey,
} from '../config/appConfig'

export function readStoredJson(key, fallback) {
  const rawValue = window.localStorage.getItem(key)

  if (!rawValue) {
    return fallback
  }

  try {
    return JSON.parse(rawValue)
  } catch {
    return fallback
  }
}

export function getStoredSubmissions() {
  const savedSubmissions = readStoredJson(submissionsStorageKey, [])

  if (!Array.isArray(savedSubmissions)) {
    return []
  }

  return savedSubmissions
    .map((item) => ({
      reviewStage: defaultReviewStage,
      organizerNotes: '',
      ...item,
    }))
    .sort((left, right) => {
      const leftTime = new Date(left.updatedAt || left.createdAt || 0).getTime()
      const rightTime = new Date(right.updatedAt || right.createdAt || 0).getTime()
      return rightTime - leftTime
    })
}

export function saveStoredSubmissions(submissions) {
  window.localStorage.setItem(submissionsStorageKey, JSON.stringify(submissions))
}

export function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `submission-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function getAgeDetails(ageValue) {
  const numericAge = Number(ageValue)
  const hasAge = Number.isFinite(numericAge) && numericAge > 0
  const isEligible = hasAge && numericAge < 18
  const isUnder13 = hasAge && numericAge < 13
  const canSelfApply = hasAge && numericAge >= 13 && numericAge < 18

  return {
    numericAge,
    hasAge,
    isEligible,
    isUnder13,
    canSelfApply,
  }
}

export function getApplicationOwnerLabel(ownerId, formContent) {
  const ownersById = Object.fromEntries(
    (formContent.applicationPaths || []).map((item) => [item.id, item.label]),
  )

  return ownersById[ownerId] || formContent.missingApplicationOwner
}

export function getAdditionalTeamMembers(formState, formContent) {
  const members = []

  if (formState.teamType === 'duo' || formState.teamType === 'trio') {
    members.push({
      id: 'teamMemberTwo',
      title: formContent.teamMemberCards.secondTitle,
      nameKey: 'teamMemberTwoName',
      ageKey: 'teamMemberTwoAge',
      cityKey: 'teamMemberTwoCity',
      contactKey: 'teamMemberTwoContact',
    })
  }

  if (formState.teamType === 'trio') {
    members.push({
      id: 'teamMemberThree',
      title: formContent.teamMemberCards.thirdTitle,
      nameKey: 'teamMemberThreeName',
      ageKey: 'teamMemberThreeAge',
      cityKey: 'teamMemberThreeCity',
      contactKey: 'teamMemberThreeContact',
    })
  }

  return members
}

export function getProjectVideoStatusKey(submission) {
  if (submission?.projectVideo?.url || submission?.projectVideo?.path) {
    return 'uploaded'
  }

  return submission?.projectStage === 'idea' ? 'followUpAllowed' : 'requiredNow'
}

export function getProjectVideoStatusLabel(statusKey, formContent) {
  const normalizedKey =
    statusKey === 'follow_up_allowed'
      ? 'followUpAllowed'
      : statusKey === 'required_now'
        ? 'requiredNow'
        : statusKey

  return formContent.projectVideoStatuses?.[normalizedKey] || normalizedKey
}

export function buildSubmissionSummary(formState, formContent, categoriesById, stagesById) {
  const teamModesById = Object.fromEntries(
    (formContent.teamModes || []).map((item) => [item.id, item.label]),
  )
  const ageDetails = getAgeDetails(formState.age)
  const applicationOwner = ageDetails.isUnder13 ? 'adult' : formState.applicationOwner
  const applicationOwnerLabel = getApplicationOwnerLabel(applicationOwner, formContent)
  const additionalTeamMembers = getAdditionalTeamMembers(formState, formContent)
  const projectVideoStatusKey =
    formState.projectVideoStatus || getProjectVideoStatusKey(formState)
  const lines = [
    formContent.summaryTitle,
    '',
    `${formContent.summaryLabels.projectId}: ${
      formState.projectId || formState.submissionId || formContent.snapshotEmpty
    }`,
    `${formContent.summaryLabels.projectStatus}: ${
      formContent.projectStatuses?.[formState.reviewStage] || formContent.projectStatusFallback
    }`,
    `${formContent.summaryLabels.fullName}: ${formState.fullName}`,
    `${formContent.summaryLabels.age}: ${formState.age}`,
    `${formContent.summaryLabels.city}: ${formState.city}`,
    `${formContent.summaryLabels.school}: ${formState.school || formContent.missingSchool}`,
    `${formContent.summaryLabels.applicationOwner}: ${applicationOwnerLabel}`,
    `${formContent.summaryLabels.teamType}: ${
      teamModesById[formState.teamType] || formState.teamType || formContent.missingTeamType
    }`,
  ]

  additionalTeamMembers.forEach((member) => {
    lines.push(
      '',
      `${member.title}:`,
      `${formContent.summaryLabels.fullName}: ${formState[member.nameKey]}`,
      `${formContent.summaryLabels.age}: ${formState[member.ageKey]}`,
      `${formContent.summaryLabels.city}: ${formState[member.cityKey]}`,
      `${formContent.summaryLabels.teamMemberContact}: ${formState[member.contactKey]}`,
    )
  })

  if (!additionalTeamMembers.length && isFilled(formState.teamMembers)) {
    lines.push(`${formContent.summaryLabels.teamMembers}: ${formState.teamMembers}`)
  }

  if (applicationOwner === 'adult') {
    if (isFilled(formState.adultRole)) {
      lines.push(`${formContent.summaryLabels.adultRole}: ${formState.adultRole}`)
    }

    if (isFilled(formState.adultName)) {
      lines.push(`${formContent.summaryLabels.adultName}: ${formState.adultName}`)
    }
  }

  if (isFilled(formState.mentorName)) {
    lines.push(`${formContent.summaryLabels.mentorName}: ${formState.mentorName}`)
  }

  if (isFilled(formState.mentorContact)) {
    lines.push(`${formContent.summaryLabels.mentorContact}: ${formState.mentorContact}`)
  }

  lines.push(
    `${formContent.summaryLabels.projectName}: ${formState.projectName}`,
    `${formContent.summaryLabels.projectStage}: ${
      stagesById[formState.projectStage] || formState.projectStage
    }`,
    `${formContent.summaryLabels.category}: ${
      categoriesById[formState.category] || formState.category
    }`,
    `${formContent.summaryLabels.problem}: ${formState.problem}`,
    '',
    `${formContent.summaryLabels.description}:`,
    formState.description,
    '',
    `${formContent.summaryLabels.projectVideoStatus}: ${getProjectVideoStatusLabel(
      projectVideoStatusKey,
      formContent,
    )}`,
  )

  if (isFilled(formState.projectLink)) {
    lines.push(`${formContent.summaryLabels.projectLink}: ${formState.projectLink}`)
  }

  if (formState.projectVideo?.url) {
    lines.push(`${formContent.summaryLabels.projectVideo}: ${formState.projectVideo.url}`)
  }

  if (formState.projectImages?.length) {
    lines.push(`${formContent.summaryLabels.projectImages}: ${formState.projectImages.length}`)
  }

  lines.push(`${formContent.summaryLabels.contact}: ${formState.contact}`)

  return lines.join('\n')
}

export function formatSubmissionDate(dateValue, language) {
  if (!dateValue) {
    return '—'
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat(language === 'ar' ? 'ar' : 'en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function parseHash() {
  const rawHash = window.location.hash.replace('#', '')

  if (!rawHash) {
    return { page: 'home', section: '' }
  }

  const [page, section = ''] = rawHash.split(':')

  return {
    page: ['home', 'contact', 'dashboard', 'tracker', 'accepted'].includes(page)
      ? page
      : 'home',
    section,
  }
}

export function scrollToRoute(section) {
  if (!section) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const target = document.getElementById(section)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function getPreferredLanguage() {
  const languageFromUrl = new URLSearchParams(window.location.search).get('lang')

  if (languageFromUrl === 'ar' || languageFromUrl === 'en') {
    return languageFromUrl
  }

  const savedLanguage = window.localStorage.getItem(languageStorageKey)

  if (savedLanguage === 'ar' || savedLanguage === 'en') {
    return savedLanguage
  }

  return navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

export function buildLanguageHref(nextLanguage) {
  const hash = window.location.hash || '#home'
  return `?lang=${nextLanguage}${hash}`
}

export function isFilled(value) {
  return String(value ?? '').trim().length > 0
}

export function getVideoPreviewSource(item) {
  if (!item || item.type !== 'video') {
    return { kind: 'placeholder' }
  }

  if (item.embedUrl) {
    return { kind: 'embed', src: item.embedUrl }
  }

  if (!item.videoUrl) {
    return { kind: 'placeholder' }
  }

  try {
    const parsedUrl = new URL(item.videoUrl)
    const hostname = parsedUrl.hostname.replace(/^www\./, '')

    if (hostname === 'youtu.be') {
      const videoId = parsedUrl.pathname.replace('/', '')

      if (videoId) {
        return { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${videoId}` }
      }
    }

    if (hostname.includes('youtube.com')) {
      const videoId = parsedUrl.searchParams.get('v')

      if (videoId) {
        return { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${videoId}` }
      }
    }

    if (hostname === 'vimeo.com') {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0]

      if (videoId) {
        return { kind: 'embed', src: `https://player.vimeo.com/video/${videoId}` }
      }
    }

    if (/\.(mp4|webm|ogg)$/i.test(parsedUrl.pathname)) {
      return { kind: 'file', src: item.videoUrl }
    }

    return { kind: 'external', src: item.videoUrl }
  } catch {
    if (/\.(mp4|webm|ogg)$/i.test(item.videoUrl)) {
      return { kind: 'file', src: item.videoUrl }
    }

    return { kind: 'external', src: item.videoUrl }
  }
}
