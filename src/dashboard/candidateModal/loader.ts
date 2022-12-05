import { LoaderFunctionArgs } from 'react-router-dom'
import AdminCandidate from '../../interfaces/AdminCandidate'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { candidateId } = params
  const candidate = await fetchWithToken(
    `users/profile/${candidateId}`,
    '',
    'get'
  )

  if (candidate.status !== 'success')
    throw new Error(`Fetch users/profile/${candidateId} failed: ${candidate}`)
  return candidate.payload as AdminCandidate
}
