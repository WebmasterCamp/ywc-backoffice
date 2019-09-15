import { action, observable } from 'mobx'
import { create, persist } from 'mobx-persist'
import StaffApplication from '../interfaces/StaffApplication'
import StaffCandidate from '../interfaces/StaffCandidate'
import StaffStatus from '../interfaces/StaffStatus'
import { fetchWithToken } from '../utils/fetch'
import history from '../utils/history'

class Staff {
  @persist @observable public loading: boolean = false
  @persist('list') @observable public applications: StaffCandidate[] = []
  @persist('list')
  @observable
  public completedApplication: StaffCandidate[] = []
  @persist('list')
  @observable
  public incompleteApplication: StaffCandidate[] = []
  @observable public staffStatus: StaffStatus = {
    all: 0,
    checked: 0,
    notChecked: 0,
    percent: 0
  }
  @observable public application: StaffApplication = {
    birthdate: '',
    educationStatus: '',
    major: '',
    questions: {
      _id: '',
      confirmedMajor: '',
      generalQuestions: [],
      majorQuestions: []
    },
    sex: ''
  }

  @action
  public async getApplications() {
    const applications = await fetchWithToken('users/staff', '', 'get')

    if (applications.status === 'success') {
      const applicationsList = applications.payload.map(
        (application: StaffCandidate) => {
          return {
            _id: application._id,
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
    const application = await fetchWithToken(`users/staff/${id}`, '', 'GET')

    if (application.status === 'success') {
      this.application = application.payload
    }
  }

  @action
  public async getCommitteeStatus() {
    const staffStatus = await fetchWithToken('grading/staff/status', '', 'GET')

    if (staffStatus.status === 'success') {
      this.staffStatus = {
        all: staffStatus.payload.allApplications,
        checked: staffStatus.payload.checkedApplications,
        notChecked: staffStatus.payload.notCheckedApplications,
        percent: Math.round(
          (staffStatus.payload.checkedApplications /
            staffStatus.payload.allApplications) *
            100
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

  @action
  public async doVotePass(id: string, comment: string) {
    this.loading = true
    const voteStatus = await fetchWithToken(
      'grading/staff/pass',
      { id, comment },
      'POST'
    )

    if (voteStatus.status === 'success') {
      await this.getIncompleteApplication()
      this.loading = false
      if (this.incompleteApplication.length === 0) {
        return history.push('/staff/all')
      }
      return history.push(
        `/staff/candidate/${this.incompleteApplication[0]._id}`
      )
    } else {
      this.loading = false
    }
  }

  @action
  public async doVoteFailed(id: string, comment: string) {
    const voteStatus = await fetchWithToken(
      'grading/staff/eject',
      { id, comment },
      'POST'
    )

    if (voteStatus.status === 'success') {
      await this.getIncompleteApplication()
      this.loading = false
      if (this.incompleteApplication.length === 0) {
        return history.push('/staff/all')
      }
      return history.push(
        `/staff/candidate/${this.incompleteApplication[0]._id}`
      )
    } else {
      this.loading = false
    }
  }
}
const hydrate = create({ jsonify: true })

const StaffStore = new Staff()

export default StaffStore
hydrate('staff', StaffStore)
