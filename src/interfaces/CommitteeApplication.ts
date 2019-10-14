interface CommitteeApplication {
  academicYear: string
  completed: boolean
  comment: string
  department: string
  educationStatus: string
  equivalentEducationDegree: string
  faculty: string
  university: string
  questions: {
    _id: string
    majorQuestions:
      | [
          {
            _id: string
            answer: string
          }
        ]
      | []
    generalQuestions:
      | [
          {
            _id: string
            answer: string
          }
        ]
      | []
    confirmedMajor: string
  }
  activities: string
  major: string
  picture: string
  firstName: string
  lastName: string
  nickname: string
  staffUsername: string
  staffComment: string
}

export default CommitteeApplication
