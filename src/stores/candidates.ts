import { action, observable } from 'mobx'
import Candidate from '../interfaces/Candidate'
import { fetchWithToken } from '../utils/fetch'

class Candidates {
  @observable public candidates: Candidate[] = []

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
          status: candidate.status
        }
      })

      this.candidates = candidatesList
    }
  }
}

export default new Candidates()
