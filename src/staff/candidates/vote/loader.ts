import { LoaderFunctionArgs } from 'react-router-dom'
import { UsersForStaffByIdResponse } from '../../../schemas/endpoints/users'
import { requireRole } from '../../../stores/auth'
import { apiGet } from '../../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  await requireRole('STAFF')

  const { candidateId } = params
  const application = await apiGet<UsersForStaffByIdResponse>(
    `/users/staff/${candidateId}`
  )
  return { application }
}
