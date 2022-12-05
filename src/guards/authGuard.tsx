import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useStore } from 'zustand'
import { authStore, waitForAuthStore } from '../stores/auth'

export function authGuard(children: RouteObject[]) {
  return {
    path: '',
    loader: async () => {
      await waitForAuthStore
      const { user } = authStore.getState()
      if (!user) {
        return { redirect: '/login' }
      }
      return null
    },
    element: <AuthGuard />,
    children,
  }
}

function AuthGuard() {
  const user = useStore(authStore, (state) => state.user)
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
