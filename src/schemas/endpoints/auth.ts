import { z } from 'zod'

export const UserLoginRequest = z.object({
  idToken: z.string(),
  accessToken: z.string(),
  isAcceptPolicy: z.boolean(),
  isAcceptEmailMarketing: z.boolean(),
})

export interface UserLoginResponse {
  token: string
}

export const AdminLoginRequest = z.object({
  username: z.string(),
  password: z.string(),
})

export interface AdminLoginResponse {
  token: string
}
