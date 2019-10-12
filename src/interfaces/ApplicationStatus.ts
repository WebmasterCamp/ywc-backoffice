interface ApplicationStatus {
  username: string
  role: string
  major: string
  status: {
    allApplications: number
    checkedApplications: number
  }
}

export default ApplicationStatus
