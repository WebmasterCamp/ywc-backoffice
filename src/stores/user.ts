import { action, observable } from 'mobx'
import { create, persist } from 'mobx-persist'
import Profile from '../interfaces/Profile'
import { fetch, fetchWithToken } from '../utils/fetch'
import history from '../utils/history'
import notification from '../utils/notification'
import { removeToken, saveToken } from '../utils/token-helper'

class User {
  @persist @observable public isAuthentication: boolean = false
  @persist('object') @observable public admins: Profile[] = []
  @persist('object') @observable public profile: Profile = {
    _id: '',
    major: '',
    role: '',
    username: ''
  }

  @action
  public async authenticate(username: string, password: string) {
    // do authen here
    const api = await fetch('auth/login/admin', { username, password }, 'POST')

    if (api.status === 'success') {
      await saveToken(api.payload.token)

      const getProfile = await fetchWithToken(
        'admin/me',
        {},
        'GET',
        api.payload.token
      )

      if (getProfile.status === 'success') {
        await this.setProfile(getProfile.payload.profile)
        await this.setIsAuthentication(true)
        notification(
          'success',
          'Login Success',
          `Welcome ${this.profile.username}`
        )
        return history.push(`${this.profile.role}`)
      }
    } else {
      notification('error', 'Login Error', 'Username or Password incorrect')
    }
  }

  @action public async getUsersByRole(role: string) {
    const users = await fetchWithToken(`admin/role/${role}`, '', 'GET')
    if (users.status === 'success') {
      this.admins = users.payload.admins
    }
  }

  @action
  public doLogout() {
    removeToken()
    this.isAuthentication = false
    notification('success', 'Logout success!', 'Goodbye~')
    history.push('/')
  }

  @action
  public async getProfile() {
    const profile = await fetchWithToken('admin/me', '', 'GET')

    if (profile.status === 'success') {
      await this.setProfile(profile.payload.profile)
      await this.setIsAuthentication(true)
    }
  }

  @action
  public async checkAuthentication() {
    const profile = await fetchWithToken('admin/me', '', 'GET')

    if (profile.status === 'success') {
      await this.setProfile(profile.payload.profile)
      await this.setIsAuthentication(true)
      return history.push(`/${this.profile.role}`)
    }
  }

  @action.bound
  public setProfile(profile: Profile): void {
    this.profile = profile
  }

  @action.bound
  private setIsAuthentication(value: boolean) {
    this.isAuthentication = value
  }
}

const hydrate = create({ jsonify: true })

const UserStore = new User()

export default UserStore
hydrate('user', UserStore)
