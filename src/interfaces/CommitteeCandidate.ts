interface CommitteeCandidate {
  _id: string
  committeeScore: number
  committeeVote: [string]
  completed: boolean
  major: string
}

export default CommitteeCandidate
