import { createBrowserRouter, redirect, RouteObject } from 'react-router-dom'

import { route as loginRoute } from './login'
import { route as adminRoute } from './admin'
import { route as committeeRoute } from './committee'
import { route as staffRoute } from './staff'
import { route as managerRoute } from './manager'
import { route as callCenterRoute } from './callcenter'
import { Root } from './utils/history'
import { authGuard } from './guards/authGuard'
import { authStore } from './stores/auth'
import { subRoute } from './utils/subRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      subRoute('login', loginRoute),
      authGuard([
        homeRedirect(),
        subRoute('admin', adminRoute),
        subRoute('committee', committeeRoute),
        subRoute('staff', staffRoute),
        subRoute('manager', managerRoute),
        subRoute('callcenter', callCenterRoute),
      ]),
    ],
  },
])

function homeRedirect(): RouteObject {
  return {
    path: '',
    loader: async () => {
      const { user } = authStore.getState()
      if (!user) return redirect('/login')
      return redirect(`/${user.profile.role}`)
    },
  }
}
