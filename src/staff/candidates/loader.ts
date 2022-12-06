import { UsersForStaffRespone } from '../../schemas/endpoints/users'
import { requireRole } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('STAFF')

  const applications = await apiGet<UsersForStaffRespone>('/users/staff')
  return { applications }
}
