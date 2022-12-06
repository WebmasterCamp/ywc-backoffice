import ApplicationStatus from '../../interfaces/ApplicationStatus'
import { requireRole } from '../../stores/auth'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('ADMIN')

  const applicationStatus = await fetchWithToken('grading/status', {}, 'GET')

  if (applicationStatus.status !== 'success') {
    throw new Error(`Fetch grading/status failed: ${applicationStatus}`)
  }
  const applicationsStatus: ApplicationStatus[] = applicationStatus.payload

  const staffStatus: ApplicationStatus[] = applicationsStatus.filter(
    (a) => a.role === 'staff'
  )
  const contentCommittee: ApplicationStatus[] = applicationsStatus.filter(
    (a) => a.role === 'committee' && a.major === 'content'
  )
  const designCommittee: ApplicationStatus[] = applicationsStatus.filter(
    (a) => a.role === 'committee' && a.major === 'design'
  )
  const marketingCommittee: ApplicationStatus[] = applicationsStatus.filter(
    (a) => a.role === 'committee' && a.major === 'marketing'
  )
  const programmingCommittee: ApplicationStatus[] = applicationsStatus.filter(
    (a) => a.role === 'committee' && a.major === 'programming'
  )
  return {
    staffStatus,
    contentCommittee,
    designCommittee,
    marketingCommittee,
    programmingCommittee,
  }
}
