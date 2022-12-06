import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useStore } from 'zustand'
import { AdminRole } from '../interfaces/AdminRole'
import { authStore, requireRole } from '../stores/auth'

export function roleGuard(role: AdminRole, children: RouteObject[]) {
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

function RoleGuard({ role }: { role: AdminRole }) {
  const user = useStore(authStore, (state) => state.user)
  if (!user) {
    return <Navigate to="/login" />
  }
  if (user.profile.role !== role) {
    return <Navigate to={`/${user.profile.role.toLowerCase()}`} />
  }
  return <Outlet />
}
