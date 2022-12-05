import { ActionFunctionArgs } from 'react-router-dom'
import { fetchWithToken } from '../../utils/fetch'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const selected = JSON.parse(formData.get('selected') as string) as string[]
  const status = formData.get('status') as string
  if (status === 'pass') {
    const candidatePassInterview = await fetchWithToken(
      `users/interview/pass`,
      { candidates: selected },
      'POST'
    )
    if (candidatePassInterview.status !== 'success') {
      throw new Error(
        `Post users/interview/pass failed: ${candidatePassInterview}`
      )
    }
  } else if (status === 'eject') {
    const candidateEjectInterview = await fetchWithToken(
      `users/interview/eject`,
      { candidates: selected },
      'POST'
    )

    if (candidateEjectInterview.status !== 'success') {
      throw new Error(
        `Post users/interview/eject failed: ${candidateEjectInterview}`
      )
    }
  } else {
    throw new Error(`unknown status ${status}`)
  }
  return null
}
