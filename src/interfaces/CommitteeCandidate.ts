interface CommitteeCandidate {
  _id: string
  committeeScore: number
  committeeVote: [string]
  completed: boolean
  firstName: string
  lastName: string
  major: string
  nickname: string
}

export default CommitteeCandidate
