import { requireUser } from '../stores/auth'
import { legacy_fetchWithToken } from '../utils/fetch'
import * as R from 'ramda'

import Candidate from '../interfaces/Candidate'
import CountUserStep from '../interfaces/CountUserStep'
import CompletedTimeline from '../interfaces/CompletedTimeline'
import GroupByUniversity from '../interfaces/GroupByUniversity'
import DashboardGroupByStep from '../interfaces/DashboardGroupByStep'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireUser()

  const dashboardPromise = legacy_fetchWithToken('users/stat/all', '', 'get')
  const getCompletedUserPromise = legacy_fetchWithToken(
    'users/dashboard/stat',
    '',
    'get'
  )
  const getAllUserPromise = legacy_fetchWithToken('users/all', '', 'get')
  const [dashboard, getCompletedUser, getAllUser] = await Promise.all([
    dashboardPromise,
    getCompletedUserPromise,
    getAllUserPromise,
  ])

  if (dashboard.status !== 'success')
    throw new Error(`Fetch users/stat/all failed: ${dashboard}`)
  if (getCompletedUser.status !== 'success')
    throw new Error(`Fetch users/dashboard/stat failed: ${getCompletedUser}`)
  if (getAllUser.status !== 'success')
    throw new Error(`Fetch users/all failed: ${getAllUser}`)
  const payload = dashboard.payload
  const completedUserPayload = getCompletedUser.payload
  const allUserPayload = getAllUser.payload

  const totalCandidate: number = payload.totalCandidate
  const programming: number = payload.programming
  const design: number = payload.design
  const content: number = payload.content
  const marketing: number = payload.marketing
  const countUserStep: CountUserStep[] = payload.countUserStep
  const completedTimeline: CompletedTimeline[] = payload.completedTimeline
  const userNotCompleted: number = countUserNotCompleted(
    payload.completedTimeline
  )
  const userCompleted: number = countUserCompleted(payload.completedTimeline)
  const universityStat: GroupByUniversity[] =
    calculateGroupByUniversity(completedUserPayload)
  const stepStat: DashboardGroupByStep = calculateGroupByStep(allUserPayload)

  return {
    totalCandidate,
    programming,
    design,
    content,
    marketing,
    countUserStep,
    completedTimeline,
    userNotCompleted,
    userCompleted,
    universityStat,
    stepStat,
  }
}

function countUserCompleted(completedTimeline: CompletedTimeline[]): number {
  if (completedTimeline.length === 0) {
    return 0
  }

  return completedTimeline.reduce((a, b) => {
    if (b._id.month !== null) {
      return a + b.count
    }
    return a
  }, 0)
}

function countUserNotCompleted(completedTimeline: CompletedTimeline[]): number {
  if (completedTimeline.length === 0) {
    return 0
  }

  if (completedTimeline[0]._id.month === null) {
    return completedTimeline[0].count
  }

  return 0
}

function calculateGroupByUniversity(candidates: Candidate[]): any[] {
  const byUniversity = R.groupBy((candidate: Candidate) => {
    return candidate.university
  })

  return R.filter(
    (v) => v.name !== 'undefined',
    R.map(
      (v) => ({ name: v[0], value: v[1] }),
      R.toPairs(R.map((v) => v.length, byUniversity(candidates)))
    )
  )
}

function calculateGroupByStep(candidates: Candidate[]): DashboardGroupByStep {
  const info = candidates.filter(
    (candidate: Candidate) =>
      candidate.step === 'info' && candidate.status !== 'completed'
  ).length
  const contact = candidates.filter(
    (candidate: Candidate) =>
      candidate.step === 'contact' && candidate.status !== 'completed'
  ).length
  const general = candidates.filter(
    (candidate: Candidate) =>
      candidate.step === 'general' && candidate.status !== 'completed'
  ).length
  const major = candidates.filter(
    (candidate: Candidate) =>
      candidate.step === 'major' && candidate.status !== 'completed'
  ).length
  const summary = candidates.filter(
    (candidate: Candidate) =>
      candidate.step === 'summary' && candidate.status !== 'completed'
  ).length

  return { info, contact, general, major, summary }
}
