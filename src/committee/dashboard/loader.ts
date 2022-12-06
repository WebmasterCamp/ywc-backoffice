import CommitteeStatus from '../../interfaces/CommitteeStatus'
import { requireRole } from '../../stores/auth'
import { apiGet } from '../../utils/fetch'
import { GradingCommitteeStatusResponse } from '../../schemas/endpoints/grading'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('COMMITTEE')

  const committeeStatus = await apiGet<GradingCommitteeStatusResponse>(
    '/grading/committee/status'
  )

  const data: CommitteeStatus = {
    all: committeeStatus.allApplications,
    checked: committeeStatus.checkedApplications,
    notChecked: committeeStatus.notCheckedApplications,
    notPass: committeeStatus.notPassApplications,
    pass: committeeStatus.passApplications,
    percent: Math.round(
      (committeeStatus.checkedApplications / committeeStatus.allApplications) *
        100
    ),
  }
  return { committeeStatus: data }
}
