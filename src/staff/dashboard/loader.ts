import StaffStatus from '../../interfaces/StaffStatus'
import { GradingStaffStatusResponse } from '../../schemas/endpoints/grading'
import { requireRole } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('STAFF')

  const staffStatus = await apiGet<GradingStaffStatusResponse>(
    '/grading/staff/status'
  )

  const data: StaffStatus = {
    all: staffStatus.allApplications,
    checked: staffStatus.checkedApplications,
    notChecked: staffStatus.notCheckedApplications,
    percent: Math.round(
      (staffStatus.checkedApplications / staffStatus.allApplications) * 100
    ),
  }
  return { staffStatus: data }
}
