interface Tracking {
  _id: string
  firstName: string
  lastName: string
  nickname: string
  major: string
  status: string
  step: string
}

export interface TrackingForm {
  purpose: string
  userIDs: string[]
  assignee: string
}

export default Tracking
