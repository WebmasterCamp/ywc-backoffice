import { action, observable } from 'mobx'
import CommitteeCandidate from '../interfaces/CommitteeCandidate'
import { fetchWithToken } from '../utils/fetch'

class Committee {
  @observable public applications: CommitteeCandidate[] = []

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
            major: application.major
          }
        }
      )

      this.applications = applicationsList
    }
  }
}

export default new Committee()
