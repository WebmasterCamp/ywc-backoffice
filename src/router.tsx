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
import { roleGuard } from './guards/roleGuard'
import { candidateModalRoute } from './dashboard/candidateModal'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      subRoute('login', loginRoute),
      authGuard([
        homeRedirect(),
        subRoute('admin', roleGuard('ADMIN', [adminRoute])),
        subRoute('committee', roleGuard('COMMITTEE', [committeeRoute])),
        subRoute('staff', roleGuard('STAFF', [staffRoute])),
        subRoute('manager', roleGuard('MANAGER', [managerRoute])),
        subRoute('callcenter', roleGuard('CALLCENTER', [callCenterRoute])),
        candidateModalRoute,
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