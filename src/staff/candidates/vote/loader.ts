import { LoaderFunctionArgs } from 'react-router-dom'
import StaffApplication from '../../../interfaces/StaffApplication'
import { requireRole } from '../../../stores/auth'
import { fetchWithToken } from '../../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async ({ params }: LoaderFunctionArgs) => {
  await requireRole('staff')

  const { candidateId } = params
  const application = await fetchWithToken(
    `users/staff/${candidateId}`,
    '',
    'GET'
  )

  if (application.status !== 'success') {
    throw new Error(`Fetch users/staff/${candidateId} failed: ${application}`)
  }
  return { application: application.payload as StaffApplication }
}
