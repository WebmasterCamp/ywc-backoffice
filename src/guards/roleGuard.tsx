import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useStore } from 'zustand'
import { authStore, requireRole } from '../stores/auth'

export function roleGuard(role: string, children: RouteObject[]) {
  return {
    path: '',
    loader: async () => {
      await requireRole(role)
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
