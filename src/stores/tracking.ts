import { action, observable } from 'mobx'
import { persist } from 'mobx-persist'
import ITracking, { TrackingForm } from '../interfaces/Tracking'
import { fetchWithToken } from '../utils/fetch'

class Tracking {
  @observable public trackings: ITracking[] = []
  @observable public filteredCandidates: ITracking[] = []
  @persist @observable public loading: boolean = true

  @action
  public async getTrackings() {
    const trackings = await fetchWithToken('tracking/', '', 'get')
    if (trackings.status === 'success') {
      const trackingsList = trackings.payload.map((tracking: ITracking) => {
        return {
          _id: tracking._id,
          firstName: tracking.firstName,
          lastName: tracking.lastName,
          major: tracking.major,
          nickname: tracking.nickname,
          status: tracking.status,
          step: tracking.step,
          phone: tracking.phone,
          trackings: tracking.trackings
        }
      })

      this.trackings = trackingsList
    }
  }

  @action
  public async createBulkTrackings(payload: TrackingForm) {
    const result = await fetchWithToken('tracking/', payload, 'POST')
    return result.status === 'success'
  }
}
export default new Tracking()
