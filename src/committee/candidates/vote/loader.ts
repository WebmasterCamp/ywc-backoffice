import { LoaderFunctionArgs } from 'react-router-dom'
import CommitteeApplication from '../../../interfaces/CommitteeApplication'
import { waitForAuthStore } from '../../../stores/auth'
import { fetchWithToken } from '../../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  await waitForAuthStore

  const { candidateId } = params
  const application = await fetchWithToken(
    `users/committee/${candidateId}`,
    '',
    'GET'
  )

  if (application.status !== 'success') {
    throw new Error(
      `Fetch users/committee/${candidateId} failed: ${application}`
    )
  }
  const data: CommitteeApplication = application.payload
  return { application: data }
}
