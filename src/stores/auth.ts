import create from 'zustand'

import Profile from '../interfaces/Profile'
import { fetch, fetchWithToken } from '../utils/fetch'
import { getToken, removeToken, saveToken } from '../utils/token-helper'

interface User {
  token: string
  profile: Profile
}

interface AuthState {
  initialized: boolean
  user: User | null
  initializeStore: () => Promise<void>
  authenticate: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const authStore = create<AuthState>((set) => ({
  initialized: false,
  user: null,

  initializeStore: async () => {
    try {
      const token = getToken()
      const getProfile = await fetchWithToken('admin/me', '', 'GET', token)
      if (getProfile.status !== 'success') throw new Error('Get Profile Error')
      set({
        initialized: true,
        user: { token, profile: getProfile.payload.profile },
      })
    } catch (e) {
      set({ initialized: true, user: null })
    }
  },

  authenticate: async (username, password) => {
    const result = await fetch(
      'auth/login/admin',
      { username, password },
      'POST'
    )
    if (result.status !== 'success') throw new Error('Authentication Error')
    const token = result.payload.token as string
    const getProfile = await fetchWithToken('admin/me', {}, 'GET', token)
    if (getProfile.status !== 'success') throw new Error('Get Profile Error')
    saveToken(token)
    set({
      initialized: true,
      user: { token, profile: getProfile.payload.profile },
    })
  },

  logout: async () => {
    removeToken()
    set({ initialized: true, user: null })
  },
}))

export const waitForAuthStore = authStore.getState().initializeStore()
