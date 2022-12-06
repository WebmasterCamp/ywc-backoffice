import { z } from 'zod'
import { Tracking, User } from '../models'

export type TrackingGetAllResponse = (Pick<
  User,
  | 'id'
  | 'status'
  | 'step'
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'major'
  | 'phone'
> & {
  trackings: Pick<Tracking, 'id'>[]
})[]

export type TrackingMeResponse = (Omit<Tracking, 'user'> & {
  user: Pick<
    User,
    'step' | 'firstName' | 'lastName' | 'nickname' | 'major' | 'phone'
  >
})[]

export type TrackingGetByIdResponse = Omit<Tracking, 'user'> & {
  user: Pick<
    User,
    'step' | 'firstName' | 'lastName' | 'nickname' | 'major' | 'phone'
  >
}

export const TrackingCreateRequest = z.object({
  userIDs: z.array(z.string()),
  purpose: z.string(),
  assignee: z.string(),
})

export const TrackingUpdateRequest = z.object({
  phone: z.string().optional(),
  remark: z.string().optional(),
  result: z.string(),
  status: z.string(),
  group: z.string(),
})
