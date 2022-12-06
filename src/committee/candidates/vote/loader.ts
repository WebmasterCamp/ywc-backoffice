import { LoaderFunctionArgs } from 'react-router-dom'
import { UsersForCommitteeByIdResponse } from '../../../schemas/endpoints/users'
import { requireRole } from '../../../stores/auth'
import { apiGet } from '../../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  await requireRole('COMMITTEE')

  const { candidateId } = params
  const application = await apiGet<UsersForCommitteeByIdResponse>(
    `/users/committee/${candidateId}`
  )
  return { application }
}
