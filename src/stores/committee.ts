import { action, observable } from 'mobx'
import { create, persist } from 'mobx-persist'
import CommitteeApplication from '../interfaces/CommitteeApplication'
import CommitteeCandidate from '../interfaces/CommitteeCandidate'
import CommitteeStatus from '../interfaces/CommitteeStatus'
import { fetchWithToken } from '../utils/fetch'
import history from '../utils/history'

class Committee {
  @observable public loading: boolean = false
  @persist('list') @observable public applications: CommitteeCandidate[] = []
  @persist('list')
  @observable
  public completedApplication: CommitteeCandidate[] = []
  @persist('list')
  @observable
  public incompleteApplication: CommitteeCandidate[] = []
  @observable public committeeStatus: CommitteeStatus = {
    all: 0,
    checked: 0,
    notChecked: 0,
    notPass: 0,
    pass: 0,
    percent: 0
  }
  @observable public application: CommitteeApplication = {
    academicYear: '',
    activities: '',
    comment: '',
    completed: false,
    department: '',
    educationStatus: '',
    equivalentEducationDegree: '',
    faculty: '',
    firstName: '',
    lastName: '',
    major: '',
    nickname: '',
    picture: '',
    questions: {
      _id: '',
      confirmedMajor: '',
      generalQuestions: [],
      majorQuestions: []
    },
    score: 0,
    staffComment: '',
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
        notPass: committeeStatus.payload.notPassApplications,
        pass: committeeStatus.payload.passApplications,
        percent: Math.round(
          (committeeStatus.payload.checkedApplications /
            committeeStatus.payload.allApplications) *
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
  public async doVote(id: string, score: number, comment: string) {
    this.loading = true
    const voteStatus = await fetchWithToken(
      'grading/committee/vote',
      { id, score, comment },
      'POST'
    )

    if (voteStatus.status === 'success') {
      this.loading = true
      await this.getApplications()
      let nextApplicationIndex = this.applications.map(a => a._id).indexOf(id)
      if (nextApplicationIndex + 1 >= this.applications.length) {
        return history.push('/committee/all')
      }
      while (this.applications[nextApplicationIndex + 1].completed) {
        nextApplicationIndex += 1
        if (nextApplicationIndex === this.applications.length - 1) {
          return history.push('/committee/all')
        }
      }
      window.scrollTo(0, 0)
      return history.push(
        `/committee/candidate/${
          this.applications[nextApplicationIndex + 1]._id
        }`
      )
    } else {
      this.loading = false
    }
  }
}

const hydrate = create({ jsonify: true })

const CommitteeStore = new Committee()

export default CommitteeStore
hydrate('committee', CommitteeStore)
