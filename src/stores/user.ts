import { action, observable } from 'mobx'
import Profile from '../interfaces/Profile'
import { fetch, fetchWithToken } from '../utils/fetch'
import history from '../utils/history'
import notification from '../utils/notification'
import { removeToken, saveToken } from '../utils/token-helper'

class User {
  @observable public isAuthentication: boolean = false
  @observable public profile: Profile = {
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
        history.push(`${this.profile.role}`)
      }
    } else {
      notification('error', 'Login Error', 'Username or Password incorrect')
    }
  }

  @action
  public async doLogout() {
    removeToken()
    notification('error', 'Logout success!', 'Goodbye~')
    history.push('/')
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

export default new User()
