import { UsersGetAllResponse } from '../../schemas/endpoints/users'
import { requireUser } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireUser()

  const candidates = await apiGet<UsersGetAllResponse>('/users/all')
  return candidates
}
