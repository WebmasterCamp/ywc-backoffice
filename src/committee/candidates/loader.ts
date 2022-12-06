import CommitteeCandidate from '../../interfaces/CommitteeCandidate'
import { requireRole } from '../../stores/auth'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('COMMITTEE')

  const applications = await fetchWithToken('users/committee', '', 'get')

  if (applications.status !== 'success') {
    throw new Error(`Fetch users/committee failed: ${applications}`)
  }

  const applicationsList = (applications.payload as CommitteeCandidate[]).map(
    (application) => {
      return {
        _id: application._id,
        committeeScore: application.committeeScore,
        committeeVote: application.committeeVote,
        completed: application.completed,
        firstName: application.firstName,
        lastName: application.lastName,
        major: application.major,
        nickname: application.nickname,
      }
    }
  )

  return { applications: applicationsList }
}
