import { z } from 'zod'
import { Admin } from '../models'

export type GradingStatusResponse = (Pick<
  Admin,
  'username' | 'role' | 'major'
> & {
  status: {
    allApplications: number | undefined
    checkedApplications: number | undefined
  }
})[]

export const GradingStaffPassRequest = z.object({
  id: z.string(),
  comment: z.string(),
})

export const GradingStaffEjectRequest = z.object({
  id: z.string(),
  comment: z.string(),
})

export interface GradingStaffStatusResponse {
  allApplications: number
  checkedApplications: number
  notCheckedApplications: number
}

export const GradingCommitteeVoteRequest = z.object({
  id: z.string(),
  score: z.number().int(),
  comment: z.string(),
})

export interface GradingCommitteeStatusResponse {
  allApplications: number
  passApplications: number
  notPassApplications: number
  checkedApplications: number
  notCheckedApplications: number
}

export const GradingManagerStatusRequest = z.object({
  id: z.string(),
  score: z
    .number()
    .int()
    .optional(),
  reservation: z.boolean().optional(),
  interview: z.boolean().optional(),
  finalist: z.boolean().optional(),
  interviewRef: z.string().optional(),
  reservationNo: z.number().optional(),
  verificationAmount: z.number().optional(),
})
