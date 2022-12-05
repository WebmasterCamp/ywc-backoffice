import StaffCandidate from '../../interfaces/StaffCandidate'
import { waitForAuthStore } from '../../stores/auth'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await waitForAuthStore

  const applications = await fetchWithToken('users/staff', '', 'get')

  if (applications.status !== 'success') {
    throw new Error(`Fetch users/staff failed: ${applications}`)
  }

  const applicationsList = (applications.payload as any[]).map(
    (application: StaffCandidate) => {
      return {
        _id: application._id,
        completed: application.completed,
        isPassStaff: application.isPassStaff,
        major: application.major,
      }
    }
  )

  return { applications: applicationsList }
}
