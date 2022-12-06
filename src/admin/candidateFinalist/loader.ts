import { LoaderFunctionArgs } from 'react-router-dom'
import Candidate from '../../interfaces/Candidate'
import { requireRole } from '../../stores/auth'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  await requireRole('ADMIN')

  const { major } = params
  const candidates = await fetchWithToken(
    `users/interview/pass/${major}`,
    '',
    'get'
  )

  if (candidates.status !== 'success')
    throw new Error(`Fetch users/interview/pass/${major} failed: ${candidates}`)
  const candidateList: Candidate[] = candidates.payload
  const filteredCandidates = candidateList.filter((a) => a.major === major)

  return { filteredCandidates }
}
