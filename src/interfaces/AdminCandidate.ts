interface AdminCandidate {
  _id: string
  facebook: string
  status: string
  questions: [{ _id: string; answer: string }] | []
  completed_at: Date
  created_at: Date
  profile: string

  // Step 1
  title: string
  firstName: string
  firstNameEN: string
  lastName: string
  lastNameEN: string
  nickname: string
  birthdate: string
  email: string
  religion: string
  picture: string
  sex: string
  phone: string
  address: string
  subDistruct: string
  district: string
  province: string
  postalCode: string
  educationStatus: string
  academicYear: string
  faculty: string
  department: string
  university: string

  // Step 2
  disease: string
  foodAllergy: string
  medAllergy: string
  shirtSize: string
  activities: string
  knowCamp: [string]
  emergencyFirstName: string
  emergencyLastName: string
  emergencyPhone: string
  emergencyPhoneRelated: string
  major: string
  isConfirmedMajor: boolean

  // Grading
  failed: boolean
  isPassStaff: boolean
  staffComment: string
  staffUsername: string
  staffCheckedAt: Date
  committeeVote: [{ committee: string; score: number }]

  // status
  isAnswerGeneral: boolean
  isAnswerMajor: boolean
  passInterview: boolean
  isFinalist: boolean
  verificationAmount: number
  isReservation: boolean
  reservationNo: number
}

export default AdminCandidate
