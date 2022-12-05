import Candidate from '../../interfaces/Candidate'
import Profile from '../../interfaces/Profile'
import { requireRole } from '../../stores/auth'
import { fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireRole('admin')

  const trackingsPromise = fetchWithToken('tracking', '', 'get')
  const usersPromise = fetchWithToken(`admin/role/callcenter`, '', 'GET')
  const [trackings, users] = await Promise.all([trackingsPromise, usersPromise])

  if (trackings.status !== 'success') {
    throw new Error(`Fetch tracking failed: ${trackings}`)
  }

  if (users.status !== 'success') {
    throw new Error(`Fetch admin/role/callcenter failed: ${users}`)
  }

  const candidates = (trackings.payload as Candidate[]).map((candidate) => {
    return {
      _id: candidate._id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      major: candidate.major,
      nickname: candidate.nickname,
      phone: candidate.phone,
      status: candidate.status,
      step: candidate.step,
      trackings: candidate.trackings,
    } as Candidate
  })

  const admins: Profile[] = users.payload.admins

  return { trackings: candidates, admins }
}
