import { action, observable } from 'mobx'
import ApplicationStatus from '../interfaces/ApplicationStatus'
import { fetchWithToken } from '../utils/fetch'
import history from '../utils/history'

class CommitteeStatus {
  @observable public staffStatus: ApplicationStatus[] = []
  @observable public contentCommittee: ApplicationStatus[] = []
  @observable public marketingCommittee: ApplicationStatus[] = []
  @observable public designCommittee: ApplicationStatus[] = []
  @observable public programmingCommittee: ApplicationStatus[] = []

  @action
  public async getApplicationStatus() {
    const applicationStatus = await fetchWithToken('grading/status', {}, 'GET')

    if (applicationStatus.status === 'success') {
      const applicationsStatus: ApplicationStatus[] = applicationStatus.payload

      this.staffStatus = applicationsStatus.filter(a => a.role === 'staff')
      this.contentCommittee = applicationsStatus.filter(
        a => a.role === 'committee' && a.major === 'content'
      )
      this.designCommittee = applicationsStatus.filter(
        a => a.role === 'committee' && a.major === 'design'
      )
      this.marketingCommittee = applicationsStatus.filter(
        a => a.role === 'committee' && a.major === 'marketing'
      )
      this.programmingCommittee = applicationsStatus.filter(
        a => a.role === 'committee' && a.major === 'programming'
      )
    }
  }
}

export default new CommitteeStatus()
