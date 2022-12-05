import { ActionFunctionArgs } from 'react-router-dom'
import { TrackingForm } from '../../interfaces/Tracking'
import { fetchWithToken } from '../../utils/fetch'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const payload: TrackingForm = {
    purpose: formData.get('purpose') as string,
    assignee: formData.get('assignee') as string,
    userIDs: JSON.parse(formData.get('userIDs') as string),
  }

  const result = await fetchWithToken('tracking', payload, 'POST')
  if (result.status !== 'success') {
    throw new Error(`Post tracking failed: ${result}`)
  }
  return null
}
