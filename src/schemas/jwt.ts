import { Admin, User } from './models'

export type UserJwtPayload = Pick<
  User,
  'id' | 'facebook' | 'status' | 'firebaseUid'
>

export type AdminJwtPayload = Pick<Admin, 'id'>
