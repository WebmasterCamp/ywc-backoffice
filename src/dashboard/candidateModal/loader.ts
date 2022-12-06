import { LoaderFunctionArgs } from 'react-router-dom'
import { UsersProfileByIdResponse } from '../../schemas/endpoints/users'
import { requireUser } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  await requireUser()

  const { candidateId } = params
  const candidate = await apiGet<UsersProfileByIdResponse>(
    `/users/profile/${candidateId}`
  )
  return candidate
}
