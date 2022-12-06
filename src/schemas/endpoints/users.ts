import { z } from 'zod'
import { Question, User } from '../models'

export type UsersGetAllResponse = (Pick<
  User,
  | 'id'
  | 'facebook'
  | 'status'
  | 'step'
  | 'firstNameEN'
  | 'lastNameEN'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'email'
  | 'university'
  | 'major'
  | 'committeeVote'
  | 'birthdate'
  | 'sex'
  | 'phone'
  | 'failed'
  | 'isPassStaff'
  | 'staffUsername'
> & {
  committeeScore: number
})[]

type AnnouncementUser = Pick<
  User,
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'major'
  | 'interviewRef'
  | 'isFinalist'
  | 'isReserve'
  | 'reserveNo'
  | 'verificationAmount'
>

export type UsersAllAnnouncementResponse = {
  [K in 'content' | 'design' | 'marketing' | 'programming']: {
    finalist: AnnouncementUser[]
    reserve: AnnouncementUser[]
  }
}

export type UsersAnnouncementByInterviewRefResponse = Pick<
  User,
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'major'
  | 'interviewRef'
  | 'isFinalist'
  | 'isReserve'
  | 'reserveNo'
  | 'verificationAmount'
>

type InterviewPassUser = Pick<
  User,
  'title' | 'firstName' | 'lastName' | 'nickname' | 'university' | 'major'
>

export interface UsersInterviewPassResponse {
  content: InterviewPassUser[]
  design: InterviewPassUser[]
  marketing: InterviewPassUser[]
  programming: InterviewPassUser[]
}

export type UsersInterviewPassByMajorResponse = (Pick<
  User,
  | 'id'
  | 'facebook'
  | 'email'
  | 'major'
  | 'status'
  | 'step'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'committeeVote'
  | 'passInterview'
  | 'verificationAmount'
  | 'isFinalist'
  | 'isReserve'
  | 'reserveNo'
  | 'birthdate'
  | 'sex'
  | 'phone'
> & {
  questions: Question
  committeeScore: number
})[]

export type UsersInterviewByMajorResponse = (Pick<
  User,
  | 'id'
  | 'facebook'
  | 'email'
  | 'major'
  | 'status'
  | 'step'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'committeeVote'
  | 'passInterview'
  | 'birthdate'
  | 'sex'
  | 'phone'
> & {
  questions: Question
  committeeScore: number
})[]

export const UsersInterviewPassRequest = z.object({
  candidates: z.array(z.string()),
})

export const UsersInterviewEjectRequest = z.object({
  candidates: z.array(z.string()),
})

export const UsersFinalistPassRequest = z.object({
  id: z.string(),
})

export const UsersFinalistReserveRequest = z.object({
  id: z.string(),
  reserveNo: z.number(),
})

export const UsersFinalistVerificationRequest = z.object({
  id: z.string(),
  verificationAmount: z.number(),
})

export type UsersDashboardStatResponse = (Pick<
  User,
  | 'id'
  | 'facebook'
  | 'status'
  | 'firstNameEN'
  | 'lastNameEN'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'email'
  | 'university'
  | 'step'
  | 'major'
  | 'committeeVote'
  | 'birthdate'
  | 'sex'
  | 'phone'
  | 'failed'
  | 'isPassStaff'
  | 'staffUsername'
> & {
  committeeScore: number
  isAnswerGeneral: boolean
  isAnswerMajor: boolean
})[]

export type UsersForStaffRespone = (Pick<
  User,
  'id' | 'major' | 'isPassStaff' | 'failed' | 'completedAt'
> & {
  completed: boolean
})[]

export type UsersForStaffByIdResponse = Pick<
  User,
  | 'birthdate'
  | 'staffComment'
  | 'sex'
  | 'educationStatus'
  | 'major'
  | 'isPassStaff'
  | 'failed'
> & {
  questions: Question
  completed: boolean
}

export interface UsersCommitteeStat {
  passStaff: number
}

export type UsersForCommitteeResponse = (Pick<
  User,
  'id' | 'major' | 'committeeVote' | 'firstName' | 'lastName' | 'nickname'
> & {
  completed: boolean
  committeeScore: number
})[]

export type UsersForCommitteeByIdResponse = Pick<
  User,
  | 'id'
  | 'academicYear'
  | 'committeeVote'
  | 'department'
  | 'educationStatus'
  | 'faculty'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'picture'
  | 'university'
  | 'activities'
  | 'major'
  | 'staffComment'
  | 'staffUsername'
> & {
  questions: Question
  completed: boolean
  comment?: string
  score?: number
}

export type UsersProfileByIdResponse = User & {
  questions: Question
}

export type UsersMeResponse = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'picture'
> & {
  questions: Question
  step: string
  status: string
}

export interface UsersStatResponse {
  content: number
  design: number
  marketing: number
  programming: number
}

export type UsersStatAllResponse = any
