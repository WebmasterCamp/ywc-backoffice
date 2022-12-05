import StaffStatus from '../../interfaces/StaffStatus'
import { waitForAuthStore } from '../../stores/auth'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await waitForAuthStore

  const staffStatus = await fetchWithToken('grading/staff/status', '', 'GET')

  if (staffStatus.status !== 'success') {
    throw new Error(`Fetch grading/staff/status failed: ${staffStatus}`)
  }

  const data: StaffStatus = {
    all: staffStatus.payload.allApplications,
    checked: staffStatus.payload.checkedApplications,
    notChecked: staffStatus.payload.notCheckedApplications,
    percent: Math.round(
      (staffStatus.payload.checkedApplications /
        staffStatus.payload.allApplications) *
        100
    ),
  }
  return { staffStatus: data }
}
