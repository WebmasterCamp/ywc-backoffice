interface Candidate {
  id: string
  firstName: string
  lastName: string
  firstNameEN: string
  lastNameEN: string
  nickname: string
  major: string
  sex: string
  phone: string
  status: string
  step: string
  email: string
  university: string
  facebook: string
  isAnswerGeneral: boolean
  isAnswerMajor: boolean
  isPassStaff: boolean
  isReserve: boolean
  reserveNo: number
  isFinalist: boolean
  passInterview: boolean
  verificationAmount: number
  staffUsername: string
  failed: boolean
  birthdate: string
  committeeScore: number
  committeeVote: [
    {
      _id: string
      score: number
      committee: string
    }
  ]
  trackings: string[]
}

export default Candidate
