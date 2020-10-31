import { action, observable } from 'mobx'
import { persist } from 'mobx-persist'
import Candidate from '../interfaces/Candidate'
import Tracking, { TrackingForm } from '../interfaces/Tracking'
import { fetchWithToken } from '../utils/fetch'

class TrackingStore {
  @observable public trackings: Candidate[] = []
  @persist @observable public loading: boolean = true

  @action
  public async getTrackings() {
    const trackings = await fetchWithToken('tracking/', '', 'get')
    if (trackings.status === 'success') {
      const candidates = trackings.payload.map((candidate: Candidate) => {
        return {
          _id: candidate._id,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          major: candidate.major,
          nickname: candidate.nickname,
          phone: candidate.phone,
          status: candidate.status,
          step: candidate.step,
          trackings: candidate.trackings
        }
      })

      this.trackings = candidates
    }
  }

  @action
  public async createBulkTrackings(payload: TrackingForm) {
    const result = await fetchWithToken('tracking/', payload, 'POST')
    return result.status === 'success'
  }
}
export default new TrackingStore()
