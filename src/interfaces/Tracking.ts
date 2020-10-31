import Candidate from './Candidate'

interface Tracking {
  _id: string
  purpose: string
  assigner: string
  assignee: string
  user: Candidate
  remark: string
  result: string
  status: string
  group: string
  step: string
  created_at: string
  completed_at: string
}

export interface TrackingForm {
  purpose: string
  userIDs: string[]
  assignee: string
}

export default Tracking
