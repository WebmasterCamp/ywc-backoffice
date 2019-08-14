import { action, observable } from 'mobx'
import CommitteeApplication from '../interfaces/CommitteeApplication'
import CommitteeCandidate from '../interfaces/CommitteeCandidate'
import CommitteeStatus from '../interfaces/CommitteeStatus'
import { fetchWithToken } from '../utils/fetch'

class Committee {
  @observable public applications: CommitteeCandidate[] = []
  @observable public completedApplication: CommitteeCandidate[] = []
  @observable public incompleteApplication: CommitteeCandidate[] = []
  @observable public committeeStatus: CommitteeStatus = {
    all: 0,
    checked: 0,
    notChecked: 0,
    percent: 0
  }
  @observable public application: CommitteeApplication = {
    academicYear: '',
    activities: '',
    department: '',
    educationStatus: '',
    equivalentEducationDegree: '',
    faculty: '',
    major: '',
    questions: {
      _id: '',
      confirmedMajor: '',
      generalQuestions: [],
      majorQuestions: []
    },
    staffUsername: '',
    university: ''
  }

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
  public async getApplicationById(id: string) {
    const application = await fetchWithToken(`users/committee/${id}`, '', 'GET')

    if (application.status === 'success') {
      this.application = application.payload
    }
  }

  @action
  public async getCommitteeStatus() {
    const committeeStatus = await fetchWithToken(
      'grading/committee/status',
      '',
      'GET'
    )

    if (committeeStatus.status === 'success') {
      this.committeeStatus = {
        all: committeeStatus.payload.allApplications,
        checked: committeeStatus.payload.checkedApplications,
        notChecked: committeeStatus.payload.notCheckedApplications,
        percent: Math.round(
          committeeStatus.payload.checkedApplications /
            committeeStatus.payload.notCheckedApplications
        )
      }
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
