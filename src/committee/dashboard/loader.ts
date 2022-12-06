import CommitteeStatus from '../../interfaces/CommitteeStatus'
import { requireRole } from '../../stores/auth'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('COMMITTEE')

  const committeeStatus = await fetchWithToken(
    'grading/committee/status',
    '',
    'GET'
  )

  if (committeeStatus.status !== 'success') {
    throw new Error(`Fetch grading/committee/status failed: ${committeeStatus}`)
  }

  const data: CommitteeStatus = {
    all: committeeStatus.payload.allApplications,
    checked: committeeStatus.payload.checkedApplications,
    notChecked: committeeStatus.payload.notCheckedApplications,
    notPass: committeeStatus.payload.notPassApplications,
    pass: committeeStatus.payload.passApplications,
    percent: Math.round(
      (committeeStatus.payload.checkedApplications /
        committeeStatus.payload.allApplications) *
        100
    ),
  }
  return { committeeStatus: data }
}
