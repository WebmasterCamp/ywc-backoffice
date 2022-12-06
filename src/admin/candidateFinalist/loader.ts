import { LoaderFunctionArgs } from 'react-router-dom'
import { UsersInterviewPassByMajorResponse } from '../../schemas/endpoints/users'
import { requireRole } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  await requireRole('ADMIN')

  const { major } = params
  const candidates = await apiGet<UsersInterviewPassByMajorResponse>(
    `/users/interview/pass/${major}`
  )

  return { filteredCandidates: candidates }
}
