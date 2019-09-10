export default interface StaffCandidate {
  _id: string
  major: 'content' | 'design' | 'marketing' | 'programming'
  isPassStaff: undefined | boolean
  completed: undefined | boolean
}
