import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { fetchWithToken } from '../../../utils/fetch'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const what = formData.get('action') as string
  switch (what) {
    case 'votePass':
      await votePass(formData)
      break
    case 'voteFail':
      await voteFail(formData)
      break
    default:
      throw new Error(`unknown action: ${what}`)
  }
  const nextApplicationId = formData.get('nextApplicationId') as string
  if (nextApplicationId) {
    return redirect(`/staff/candidate/${nextApplicationId}`)
  } else {
    return redirect('/staff/all')
  }
}

async function votePass(formData: FormData) {
  const id = formData.get('id') as string
  const comment = formData.get('comment') as string

  const voteStatus = await fetchWithToken(
    'grading/staff/pass',
    { id, comment },
    'POST'
  )

  if (voteStatus.status !== 'success') {
    throw new Error(`Post grading/staff/pass failed: ${voteStatus}`)
  }
}

async function voteFail(formData: FormData) {
  const id = formData.get('id') as string
  const comment = formData.get('comment') as string

  const voteStatus = await fetchWithToken(
    'grading/staff/eject',
    { id, comment },
    'POST'
  )

  if (voteStatus.status !== 'success') {
    throw new Error(`Post grading/staff/eject failed: ${voteStatus}`)
  }
}
