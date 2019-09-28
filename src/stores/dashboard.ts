import { action, observable } from 'mobx'
import CompletedTimeline from '../interfaces/CompletedTimeline'
import CountUserStep from '../interfaces/CountUserStep'
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

  @action.bound
  public async getDashboard() {
    const dashboard = await fetchWithToken('users/stat/all', '', 'get')

    if (dashboard.status === 'success') {
      const payload = dashboard.payload
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
    }
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
