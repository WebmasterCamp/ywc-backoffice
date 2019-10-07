import { action, observable } from 'mobx'
import { persist } from 'mobx-persist'
import AdminCandidate from '../interfaces/AdminCandidate'
import Candidate from '../interfaces/Candidate'
import { fetchWithToken } from '../utils/fetch'

class Candidates {
  @observable public candidates: Candidate[] = []
  @observable public candidate = {} as AdminCandidate
  @persist @observable public loading: boolean = true

  @action
  public async getCandidates() {
    const candidates = await fetchWithToken('users/all', '', 'get')

    if (candidates.status === 'success') {
      const candidatesList = candidates.payload.map((candidate: Candidate) => {
        return {
          _id: candidate._id,
          birthdate: candidate.birthdate,
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
          step: candidate.step
        }
      })

      this.candidates = candidatesList
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
}

export default new Candidates()
