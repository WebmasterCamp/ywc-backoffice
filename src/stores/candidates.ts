import { action, makeObservable, observable } from 'mobx'
import AdminCandidate from '../interfaces/AdminCandidate'
import { fetchWithToken } from '../utils/fetch'

class Candidates {
  @observable public candidate = {} as AdminCandidate
  @observable public loading: boolean = true

  constructor() {
    makeObservable(this)
  }

  @action
  public async getCandidate(id: string) {
    this.loading = true
    const candidate = await fetchWithToken(`users/profile/${id}`, '', 'get')

    if (candidate.status === 'success') {
      this.candidate = candidate.payload
    }
    this.loading = false
  }
}

export default new Candidates()
