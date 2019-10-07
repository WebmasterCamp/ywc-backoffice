interface StaffApplication {
  birthdate: string
  educationStatus: string
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
  major: string
  sex: string
  staffComment: string
  completed: boolean
}

export default StaffApplication
