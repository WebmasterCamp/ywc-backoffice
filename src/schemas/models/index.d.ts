/**
 * Model Answer
 *
 */
export type Answer = {
  answer: string
  point: number
}

/**
 * Model CommitteeVote
 *
 */
export type CommitteeVote = {
  committee: string
  score: number
  comment: string
}

/**
 * Model Admin
 *
 */
export type Admin = {
  id: string
  username: string
  password: string
  major: Major | null
  role: AdminRole
}

/**
 * Model Question
 *
 */
export type Question = {
  id: string
  confirmedMajor: Major | null
  generalQuestions: Answer[]
  majorQuestions: Answer[]
}

/**
 * Model User
 *
 */
export type User = {
  id: string
  facebook: string
  status: UserStatus
  questionsId: string
  createdAt: Date
  completedAt: Date | null
  profile: string | null
  fbFirstName: string | null
  fbLastName: string | null
  firebaseUid: string
  isAcceptPolicy: boolean | null
  isAcceptEmailMarketing: boolean | null
  title: string | null
  firstName: string | null
  firstNameEN: string | null
  lastName: string | null
  lastNameEN: string | null
  nickname: string | null
  birthdate: Date | null
  phone: string | null
  email: string | null
  religion: string | null
  sex: string | null
  picture: string | null
  address: string | null
  subDistrict: string | null
  district: string | null
  province: string | null
  postalCode: string | null
  educationStatus: string | null
  academicYear: string | null
  faculty: string | null
  department: string | null
  university: string | null
  disease: string | null
  foodAllergy: string | null
  medAllergy: string | null
  shirtSize: string | null
  activities: string | null
  knowCamp: string[]
  emergencyFirstName: string | null
  emergencyLastName: string | null
  emergencyPhone: string | null
  emergencyPhoneRelated: string | null
  major: Major | null
  isConfirmedMajor: boolean
  step: RegistrationStep
  failed: boolean | null
  isPassStaff: boolean | null
  staffComment: string | null
  staffUsername: string | null
  staffCheckedAt: Date | null
  committeeVote: CommitteeVote[]
  committeeScore: number | null
  isReservation: boolean | null
  reservationNo: number | null
  passInterview: boolean
  interviewTime: string | null
  interviewCheck: boolean | null
  interviewRef: string | null
  isFinalist: boolean | null
  isReserve: boolean | null
  reserveNo: number | null
  verificationAmount: number | null
  completed: boolean | null
}

/**
 * Model Tracking
 *
 */
export type Tracking = {
  id: string
  purpose: string
  assignerId: string
  assigneeId: string
  userId: string
  phone: string | null
  remark: string | null
  result: string | null
  status: string | null
  group: string | null
  step: string | null
  createdAt: Date
  completedAt: Date | null
}

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const AdminRole: {
  STAFF: 'STAFF'
  COMMITTEE: 'COMMITTEE'
  ADMIN: 'ADMIN'
  MANAGER: 'MANAGER'
  CALLCENTER: 'CALLCENTER'
}

export type AdminRole = typeof AdminRole[keyof typeof AdminRole]

export const Major: {
  CONTENT: 'CONTENT'
  PROGRAMMING: 'PROGRAMMING'
  DESIGN: 'DESIGN'
  MARKETING: 'MARKETING'
}

export type Major = typeof Major[keyof typeof Major]

export const RegistrationStep: {
  INFO: 'INFO'
  CONTACT: 'CONTACT'
  GENERAL: 'GENERAL'
  MAJOR: 'MAJOR'
  SUMMARY: 'SUMMARY'
}

export type RegistrationStep = typeof RegistrationStep[keyof typeof RegistrationStep]

export const UserStatus: {
  IN_PROGRESS: 'IN_PROGRESS'
  COMPLETED: 'COMPLETED'
}

export type UserStatus = typeof UserStatus[keyof typeof UserStatus]
