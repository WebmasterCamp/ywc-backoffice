import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useStore } from 'zustand'
import { authStore, requireUser } from '../stores/auth'

export function authGuard(children: RouteObject[]) {
  return {
    path: '',
    loader: async () => {
      await requireUser()
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
