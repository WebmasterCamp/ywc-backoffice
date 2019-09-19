interface Candidate {
  _id: string
  firstName: string
  lastName: string
  firstNameEN: string
  lastNameEN: string
  nickname: string
  major: string
  sex: string
  phone: string
  status: string
  email: string
  facebook: string
  isAnswerGeneral: boolean
  isAnswerMajor: boolean
  isPassStaff: boolean
  staffUsername: string
  failed: boolean
  birthdate: string
  committeeVote:
    | [
        {
          _id: string
          score: number
          committee: string
        }
      ]
    | []
}

export default Candidate
