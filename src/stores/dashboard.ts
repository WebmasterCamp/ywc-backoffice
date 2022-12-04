import { action, makeObservable, observable } from 'mobx'
import * as R from 'ramda'
import Candidate from '../interfaces/Candidate'
import CompletedTimeline from '../interfaces/CompletedTimeline'
import CountUserStep from '../interfaces/CountUserStep'
import DashboardGroupByStep from '../interfaces/DashboardGroupByStep'
import GroupByUniversity from '../interfaces/GroupByUniversity'
import { fetchWithToken } from '../utils/fetch'

class Dashboard {
  @observable public totalCandidate = 0
  @observable public programming = 0
  @observable public design = 0
  @observable public content = 0
  @observable public marketing = 0
  @observable public countUserStep: CountUserStep[] = []
  @observable public completedTimeline: CompletedTimeline[] = []
  @observable public userCompleted = 0
  @observable public userNotCompleted = 0
  @observable public universityStat: GroupByUniversity[] = []
  @observable public stepStat: DashboardGroupByStep = {
    contact: 0,
    general: 0,
    info: 0,
    major: 0,
    summary: 0
  }

  constructor() {
    makeObservable(this)
  }

  @action.bound
  public async getDashboard() {
    const dashboard = await fetchWithToken('users/stat/all', '', 'get')
    const getCompletedUser = await fetchWithToken(
      'users/dashboard/stat',
      '',
      'get'
    )
    const getAllUser = await fetchWithToken('users/all', '', 'get')

    if (
      dashboard.status === 'success' &&
      getCompletedUser.status === 'success' &&
      getAllUser.status === 'success'
    ) {
      const payload = dashboard.payload
      const completedUserPayload = getCompletedUser.payload
      const allUserPayload = getAllUser.payload
      this.totalCandidate = payload.totalCandidate
      this.programming = payload.programming
      this.design = payload.design
      this.content = payload.content
      this.marketing = payload.marketing
      this.countUserStep = payload.countUserStep
      this.completedTimeline = payload.completedTimeline
      this.userNotCompleted = this.countUserNotCompleted(
        payload.completedTimeline
      )
      this.userCompleted = this.countUserCompleted(payload.completedTimeline)
      this.universityStat = this.calculateGroupByUniversity(
        completedUserPayload
      )
      this.calculateGroupByStep(allUserPayload)
    }
  }

  @action
  private calculateGroupByStep(candidates: Candidate[]) {
    this.stepStat.info = candidates.filter(
      (candidate: Candidate) =>
        candidate.step === 'info' && candidate.status !== 'completed'
    ).length
    this.stepStat.contact = candidates.filter(
      (candidate: Candidate) =>
        candidate.step === 'contact' && candidate.status !== 'completed'
    ).length
    this.stepStat.general = candidates.filter(
      (candidate: Candidate) =>
        candidate.step === 'general' && candidate.status !== 'completed'
    ).length
    this.stepStat.major = candidates.filter(
      (candidate: Candidate) =>
        candidate.step === 'major' && candidate.status !== 'completed'
    ).length
    this.stepStat.summary = candidates.filter(
      (candidate: Candidate) =>
        candidate.step === 'summary' && candidate.status !== 'completed'
    ).length
  }

  @action
  private calculateGroupByUniversity(candidates: Candidate[]): any[] {
    const byUniversity = R.groupBy((candidate: Candidate) => {
      return candidate.university
    })

    return R.filter(
      v => v.name !== 'undefined',
      R.map(
        v => ({ name: v[0], value: v[1] }),
        R.toPairs(R.map(v => v.length, byUniversity(candidates)))
      )
    )
  }

  @action
  private countUserCompleted(completedTimeline: CompletedTimeline[]): number {
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

  @action
  private countUserNotCompleted(
    completedTimeline: CompletedTimeline[]
  ): number {
    if (completedTimeline.length === 0) {
      return 0
    }

    if (completedTimeline[0]._id.month === null) {
      return completedTimeline[0].count
    }

    return 0
  }
}

export default new Dashboard()
