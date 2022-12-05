import { action, makeObservable, observable } from 'mobx'
import { create, persist } from 'mobx-persist'
import Profile from '../interfaces/Profile'
import { fetchWithToken } from '../utils/fetch'

class User {
  @persist('object') @observable public admins: Profile[] = []

  constructor() {
    makeObservable(this)
  }

  @action public async getUsersByRole(role: string) {
    const users = await fetchWithToken(`admin/role/${role}`, '', 'GET')
    if (users.status === 'success') {
      this.admins = users.payload.admins
    }
  }
}

const hydrate = create({ jsonify: true })

const UserStore = new User()

export default UserStore
hydrate('user', UserStore)
