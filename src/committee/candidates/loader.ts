import { UsersForCommitteeResponse } from '../../schemas/endpoints/users'
import { requireRole } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('COMMITTEE')

  const applications = await apiGet<UsersForCommitteeResponse>(
    '/users/committee'
  )

  return { applications }
}
