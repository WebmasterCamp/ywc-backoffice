import { Admin, AdminRole } from '../models'
import { z } from 'zod'

export interface AdminGetBackofficeUsersResponse {
  users: Pick<Admin, 'id' | 'username' | 'major' | 'role'>[]
}

export const CreateBackofficeUserRequest = z.object({
  username: z.string(),
  password: z.string(),
  role: z.nativeEnum(AdminRole),
})

export interface AdminMeResponse {
  profile: Omit<Admin, 'password'>
}

export interface AdminGetByRoleResponse {
  admins: Pick<Admin, 'id' | 'username' | 'major' | 'role'>[]
}
