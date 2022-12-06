import { AdminRole, Major } from '../../schemas/models'
import { GradingStatusResponse } from '../../schemas/endpoints/grading'
import { requireRole } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('ADMIN')

  const applicationsStatus = await apiGet<GradingStatusResponse>(
    '/grading/status'
  )

  const staffStatus = applicationsStatus.filter(
    (a) => a.role === AdminRole.STAFF
  )
  const contentCommittee = applicationsStatus.filter(
    (a) => a.role === AdminRole.COMMITTEE && a.major === Major.CONTENT
  )
  const designCommittee = applicationsStatus.filter(
    (a) => a.role === AdminRole.COMMITTEE && a.major === Major.DESIGN
  )
  const marketingCommittee = applicationsStatus.filter(
    (a) => a.role === AdminRole.COMMITTEE && a.major === Major.MARKETING
  )
  const programmingCommittee = applicationsStatus.filter(
    (a) => a.role === AdminRole.COMMITTEE && a.major === Major.PROGRAMMING
  )
  return {
    staffStatus,
    contentCommittee,
    designCommittee,
    marketingCommittee,
    programmingCommittee,
  }
}
