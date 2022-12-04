import { message } from 'antd'
import { action, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'
import AdminCandidate from '../interfaces/AdminCandidate'
import Candidate from '../interfaces/Candidate'
import { fetchWithToken } from '../utils/fetch'

class Candidates {
  @observable public candidates: Candidate[] = []
  @observable public filteredCandidates: Candidate[] = []
  @observable public candidate = {} as AdminCandidate
  @persist @observable public loading: boolean = true

  constructor() {
    makeObservable(this)
  }

  @action
  public async getCandidates() {
    const candidates = await fetchWithToken('users/all', '', 'get')

    if (candidates.status === 'success') {
      const candidatesList = candidates.payload.map((candidate: Candidate) => {
        return {
          _id: candidate._id,
          birthdate: candidate.birthdate,
          committeeScore: candidate.committeeScore,
          email: candidate.email,
          facebook: candidate.facebook,
          failed: candidate.failed,
          firstName: candidate.firstName,
          firstNameEN: candidate.firstNameEN,
          isAnswerGeneral: candidate.isAnswerGeneral,
          isAnswerMajor: candidate.isAnswerMajor,
          isPassStaff: candidate.isPassStaff,
          lastName: candidate.lastName,
          lastNameEN: candidate.lastNameEN,
          major: candidate.major,
          nickname: candidate.nickname,
          phone: candidate.phone,
          sex: candidate.sex,
          status: candidate.status,
          step: candidate.step,
        }
      })

      this.candidates = candidatesList
    }
  }

  @action
  public async getCandidatesByMajor(major: string) {
    const candidates = await fetchWithToken(
      `users/interview/${major}`,
      '',
      'get'
    )

    if (candidates.status === 'success') {
      const candidatesList = candidates.payload

      this.candidates = candidatesList
    }

    this.filteredCandidates = this.candidates.filter((a) => a.major === major)
  }

  @action
  public async doPassInterview(ids: string[], major: string) {
    const candidatePassInterview = await fetchWithToken(
      `users/interview/pass`,
      { candidates: ids },
      'POST'
    )

    if (candidatePassInterview.status === 'success') {
      message.success('Success')
      this.getCandidatesByMajor(major)
    }
  }

  @action
  public async doEjectInterview(ids: string[], major: string) {
    const candidateEjectInterview = await fetchWithToken(
      `users/interview/eject`,
      { candidates: ids },
      'POST'
    )

    if (candidateEjectInterview.status === 'success') {
      message.success('Success')
      this.getCandidatesByMajor(major)
    }
  }

  @action
  public async getCandidate(id: string) {
    this.loading = true
    const candidate = await fetchWithToken(`users/profile/${id}`, '', 'get')

    if (candidate.status === 'success') {
      this.candidate = candidate.payload
    }
    this.loading = false
  }

  @action
  public async getPassCandidatesByMajor(major: string) {
    const candidates = await fetchWithToken(
      `users/interview/pass/${major}`,
      '',
      'get'
    )

    if (candidates.status === 'success') {
      const candidatesList = candidates.payload

      this.candidates = candidatesList
    }

    this.filteredCandidates = this.candidates.filter((a) => a.major === major)
  }

  @action
  public async doPassFinalist(id: string, major: string) {
    const candidatePassFinalist = await fetchWithToken(
      `users/finalist/pass`,
      { id },
      'POST'
    )

    if (candidatePassFinalist.status === 'success') {
      message.success('Success')
      this.getPassCandidatesByMajor(major)
    }
  }

  @action
  public async doReserveFinalist(id: string, reserveNo: number, major: string) {
    const candidateReserveFinalist = await fetchWithToken(
      `users/finalist/reserve`,
      { id, reserveNo },
      'POST'
    )

    if (candidateReserveFinalist.status === 'success') {
      message.success('Success')
      this.getPassCandidatesByMajor(major)
    }
  }

  @action
  public async doChangeVerificationAmount(
    id: string,
    verificationAmount: number,
    major: string
  ) {
    const changeVerificationAmount = await fetchWithToken(
      `users/finalist/verification`,
      { id, verificationAmount },
      'POST'
    )

    if (changeVerificationAmount.status === 'success') {
      message.success('Success')
      this.getPassCandidatesByMajor(major)
    }
  }
}

export default new Candidates()
