import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { fetchWithToken } from '../../../utils/fetch'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const id = formData.get('id') as string
  const score = Number(formData.get('score') as string)
  const comment = formData.get('comment') as string
  const voteStatus = await fetchWithToken(
    'grading/committee/vote',
    { id, score, comment },
    'POST'
  )
  if (voteStatus.status !== 'success') {
    throw new Error(`Post grading/committee/vote failed: ${voteStatus}`)
  }

  const nextApplicationId = formData.get('nextApplicationId') as string
  if (nextApplicationId) {
    return redirect(`/committee/candidate/${nextApplicationId}`)
  } else {
    return redirect('/committee/all')
  }
}
