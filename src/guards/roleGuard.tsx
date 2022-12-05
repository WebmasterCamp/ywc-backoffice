import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useStore } from 'zustand'
import { authStore, waitForAuthStore } from '../stores/auth'

export function roleGuard(role: string, children: RouteObject[]) {
  return {
    path: '',
    loader: async () => {
      await waitForAuthStore
      const { user } = authStore.getState()
      if (!user) {
        return { redirect: '/login' }
      }
      if (user.profile.role !== role) {
        return { redirect: `/${user.profile.role}` }
      }
      return null
    },
    element: <RoleGuard role={role} />,
    children,
  }
}

function RoleGuard({ role }: { role: string }) {
  const user = useStore(authStore, (state) => state.user)
  if (!user) {
    return <Navigate to="/login" />
  }
  if (user.profile.role !== role) {
    return <Navigate to={`/${user.profile.role}`} />
  }
  return <Outlet />
}
