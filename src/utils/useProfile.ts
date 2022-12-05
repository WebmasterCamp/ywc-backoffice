import { useStore } from 'zustand'
import { authStore } from '../stores/auth'

export function useUser() {
  const user = useStore(authStore, (state) => state.user)
  if (!user) throw new Error('User is not initialized')
  return user
}

export function useProfile() {
  return useUser().profile
}
