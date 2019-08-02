import { action, observable } from 'mobx'
import Profile from '../interfaces/Profile'
import { fetch } from '../utils/fetch'
import notification from '../utils/notification';

class User {
  @observable public isAuthentication: boolean = false
  @observable public profile: Profile = {
    _id: '',
    major: '',
    role: '',
    username: 'lel'
  }

  @action
  public async authenticate(username: string, password: string) {
    // do authen here
    const api = await fetch('auth/login/admin', { username, password }, 'POST')

    if (api.status === 'success') {
      notification('success', 'Login Success', 'Welcome')
    } else {
      notification('error', 'Login Error', 'Username or Password incorrect')
    }
  }

  @action.bound
  public setProfile(profile: Profile): void {
    this.profile = profile
  }
}

export default new User()
