import { action, observable } from 'mobx'
import { persist } from 'mobx-persist'
import Candidate from '../interfaces/Candidate'
import Tracking, { TrackingForm } from '../interfaces/Tracking'
import { fetchWithToken } from '../utils/fetch'

class TrackingStore {
  @observable public trackings: Candidate[] = [] // TODO: Rename to candidates
  @observable public tracking: Tracking[] = []
  @observable public selectedTracking: Tracking = {
    _id: '',
    assignee: '',
    assigner: '',
    completed_at: '',
    created_at: '',
    group: '',
    phone: '',
    purpose: '',
    remark: '',
    result: '',
    status: '',
    step: '',
    user: {} as Candidate
  }
  @persist @observable public loading: boolean = true

  @action
  public async getTrackings () {
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
  public async createBulkTrackings (payload: TrackingForm) {
    const result = await fetchWithToken('tracking/', payload, 'POST')
    return result.status === 'success'
  }

  @action
  public async getTrackingCallCenter () {
    const trackings = await fetchWithToken('tracking/me', '', 'GET')
    if (trackings.status === 'success') {
      this.tracking = trackings.payload.map((tracking: Tracking) => tracking)
    }
  }

  @action
  public async getTrackingById (id: string) {
    const tracking = await fetchWithToken(`tracking/${id}`, '', 'GET')
    this.selectedTracking = { ...this.selectedTracking, ...tracking.payload }
  }
  @action
  public async updateTracking (id: string, payload: any) {
    const tracking = await fetchWithToken(`tracking/${id}`, payload, 'PUT')
    if (tracking.status === 'success') {
      this.resetSelectedTracking()
      this.getTrackingCallCenter()
    }
  }

  @action
  public resetSelectedTracking () {
    this.selectedTracking = {
      _id: '',
      assignee: '',
      assigner: '',
      completed_at: '',
      created_at: '',
      group: '',
      phone: '',
      purpose: '',
      remark: '',
      result: '',
      status: '',
      step: '',
      user: {} as Candidate
    }
  }
}
export default new TrackingStore()
