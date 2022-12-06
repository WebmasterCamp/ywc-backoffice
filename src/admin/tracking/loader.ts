import { requireRole } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'
import { TrackingGetAllResponse } from '../../schemas/endpoints/tracking'
import { AdminGetByRoleResponse } from '../../schemas/endpoints/admin'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('ADMIN')

  const trackingsPromise = apiGet<TrackingGetAllResponse>('/tracking')
  const usersPromise = apiGet<AdminGetByRoleResponse>('/admin/role/callcenter')
  const [trackings, users] = await Promise.all([trackingsPromise, usersPromise])

  return { trackings, admins: users.admins }
}
