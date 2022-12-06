import { redirect } from 'react-router-dom'
import create from 'zustand'
import { AdminRole } from '../interfaces/AdminRole'

import Profile from '../interfaces/Profile'
import { fetch, fetchWithToken } from '../utils/fetch'
import { getToken, removeToken, saveToken } from '../utils/token-helper'
import { AdminLoginResponse } from '../schemas/endpoints/auth'

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
    const { token } = await fetch<AdminLoginResponse>(
      'auth/login/admin',
      { username, password },
      'POST'
    )
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

export async function requireUser() {
  await waitForAuthStore
  const user = authStore.getState().user
  if (!user) throw redirect('/login')
  return user
}

export async function requireRole(requiredRole: AdminRole) {
  const {
    profile: { role },
  } = await requireUser()
  if (role !== requiredRole) throw redirect(`/${role.toLowerCase()}`)
}
