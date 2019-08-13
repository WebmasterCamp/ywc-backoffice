import { action, observable } from 'mobx'
import CommitteeCandidate from '../interfaces/CommitteeCandidate'
import { fetchWithToken } from '../utils/fetch'

class Committee {
  @observable public applications: CommitteeCandidate[] = []
  @observable public completedApplication: CommitteeCandidate[] = []
  @observable public incompleteApplication: CommitteeCandidate[] = []

  @action
  public async getApplications() {
    const applications = await fetchWithToken('users/committee', '', 'get')

    if (applications.status === 'success') {
      const applicationsList = applications.payload.map(
        (application: CommitteeCandidate) => {
          return {
            _id: application._id,
            committeeScore: application.committeeScore,
            committeeVote: application.committeeVote,
            completed: application.completed,
            major: application.major
          }
        }
      )

      this.applications = applicationsList
    }
  }

  @action
  public async getCompletedApplication() {
    await this.getApplications()

    this.completedApplication = this.applications.filter(
      application => application.completed
    )
  }

  @action
  public async getIncompleteApplication() {
    await this.getApplications()

    this.incompleteApplication = this.applications.filter(
      application => !application.completed
    )
  }
}

export default new Committee()
