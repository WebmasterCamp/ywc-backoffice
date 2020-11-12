export interface CommitteeVote {
  _id: string
  comment: string
  committee: string
  score: number
}

interface CommitteeCandidate {
  _id: string
  committeeScore: number
  committeeVote: CommitteeVote[]
  completed: boolean
  firstName: string
  lastName: string
  major: string
  nickname: string
}

export default CommitteeCandidate
