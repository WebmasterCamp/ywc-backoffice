import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { route as loginRoute } from './login'
import { route as adminRoute } from './admin'
import { route as committeeRoute } from './committee'
import { route as staffRoute } from './staff'
import { route as managerRoute } from './manager'
import { route as callCenterRoute } from './callcenter'
import { Root } from './utils/history'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      subRoute('', loginRoute),
      subRoute('admin', adminRoute),
      subRoute('committee', committeeRoute),
      subRoute('staff', staffRoute),
      subRoute('manager', managerRoute),
      subRoute('callcenter', callCenterRoute),
    ],
  },
])

function subRoute(path: string, route: RouteObject) {
  return { path, children: [route] }
}
