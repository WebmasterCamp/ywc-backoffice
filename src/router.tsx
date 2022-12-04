import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import Login from './login'

import { route as adminRoute } from './admin'
import { route as committeeRoute } from './committee'
import { route as staffRoute } from './staff'
import { route as managerRoute } from './manager'
import { route as callCenterRoute } from './callcenter'
import { Root } from './utils/history'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Login />} />
      {adminRoute}
      {committeeRoute}
      {staffRoute}
      {managerRoute}
      {callCenterRoute}
    </Route>
  )
)
