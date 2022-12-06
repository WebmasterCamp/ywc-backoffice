import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'
import {
  TrackingGetByIdResponse,
  TrackingMeResponse,
  TrackingUpdateRequest,
} from '../../schemas/endpoints/tracking'
import { requireRole } from '../../stores/auth'
import { apiGet, apiPut } from '../../utils/fetch'
import { z } from 'zod'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('CALLCENTER')

  const result = await apiGet<TrackingMeResponse>('/tracking/me')

  const trackings = result
    .map((tracking) => tracking)
    .filter((tracking) => !!tracking.user)
  return { trackings }
}

export type TrackingByIdLoaderData = Awaited<
  ReturnType<typeof trackingByIdLoader>
>

export const trackingByIdLoader = async ({ params }: LoaderFunctionArgs) => {
  await requireRole('CALLCENTER')

  const { trackingId } = params
  const tracking = await apiGet<TrackingGetByIdResponse>(
    `/tracking/${trackingId}`
  )
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
  const remark = formData.get('remark') as string
  const result = formData.get('result') as string
  const status = formData.get('status') as string

  await apiPut<z.infer<typeof TrackingUpdateRequest>>(
    `/tracking/${trackingId}`,
    {
      phone,
      remark,
      result,
      status,
      group,
    }
  )
}
