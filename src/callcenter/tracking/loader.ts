import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'
import Tracking from '../../interfaces/Tracking'
import { requireRole } from '../../stores/auth'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('CALLCENTER')

  const result = await fetchWithToken('tracking/me', '', 'GET')
  if (result.status !== 'success') {
    throw new Error(`Fetch tracking/me failed: ${result}`)
  }

  const trackings: Tracking[] = (result.payload as Tracking[])
    .map((tracking: Tracking) => tracking)
    .filter((tracking: Tracking) => !!tracking.user)
  return { trackings }
}

export type TrackingByIdLoaderData = Awaited<
  ReturnType<typeof trackingByIdLoader>
>

export const trackingByIdLoader = async ({ params }: LoaderFunctionArgs) => {
  await requireRole('CALLCENTER')

  const { trackingId } = params
  const result = await fetchWithToken(`tracking/${trackingId}`, '', 'GET')
  if (result.status !== 'success') {
    throw new Error(`Fetch tracking/${trackingId} failed: ${result}`)
  }
  const tracking: Tracking = result.payload
  return tracking
}

export const trackingByIdAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const { trackingId } = params
  const formData = await request.formData()

  const group = formData.get('group') as string
  const phone = formData.get('phone') as string
  const purpose = formData.get('purpose') as string
  const remark = formData.get('remark') as string
  const result = formData.get('result') as string
  const status = formData.get('status') as string
  const payload = { group, phone, purpose, remark, result, status }

  const tracking = await fetchWithToken(
    `tracking/${trackingId}`,
    payload,
    'PUT'
  )
  if (tracking.status !== 'success') {
    throw new Error(`Update tracking/${trackingId} failed: ${tracking}`)
  }
  return null
}
