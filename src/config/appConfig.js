export const routeStorageKey = 'gaza-youth-tech-hackathon-application'
export const submissionsStorageKey = 'gaza-youth-tech-hackathon-submissions'
export const languageStorageKey = 'gaza-youth-tech-hackathon-language'
export const projectTrackerStorageKey = 'gaza-youth-tech-hackathon-project-tracker'

export const defaultCategory = ''
export const defaultStage = ''
export const defaultReviewStage = 'submitted'

export const techFromPalestineUrl = 'https://techfrompalestine.org/'
export const contactEmail = 'contact@techfrompalestine.org'
export const contactPhone = '00972597262318'
export const publicAssetBase = import.meta.env.BASE_URL || '/'

export function withPublicAssetPath(path) {
  return `${publicAssetBase}${String(path || '').replace(/^\//, '')}`
}

export const initialFormState = {
  submissionId: '',
  projectId: '',
  fullName: '',
  age: '',
  applicationOwner: '',
  city: '',
  school: '',
  teamType: 'solo',
  teamMemberTwoName: '',
  teamMemberTwoAge: '',
  teamMemberTwoCity: '',
  teamMemberTwoContact: '',
  teamMemberThreeName: '',
  teamMemberThreeAge: '',
  teamMemberThreeCity: '',
  teamMemberThreeContact: '',
  adultRole: '',
  adultName: '',
  mentorEnabled: 'no',
  mentorName: '',
  mentorContact: '',
  projectName: '',
  category: defaultCategory,
  projectStage: defaultStage,
  problem: '',
  description: '',
  projectLink: '',
  contact: '',
}
