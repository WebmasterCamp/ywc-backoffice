interface CommitteeCandidate {
  _id: string
  committeeScore: number
  committeeVote: [string]
  major: string
}

export default CommitteeCandidate
