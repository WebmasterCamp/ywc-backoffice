import { Fragment } from 'react'
import { UserOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import Candidates from '../dashboard/Candidates'

import { Outlet, RouteObject } from 'react-router-dom'
import { subRoute } from '../utils/subRoute'
import { dashboardRoute } from '../dashboard'

const Manager = () => {
  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <UserOutlined />, label: 'Dashboard', key: '/manager' },
          {
            icon: <UserOutlined />,
            label: 'All Candidates',
            key: '/manager/candidates',
          },
        ]}
      >
        <Outlet />
      </MenuBar>
    </Fragment>
  )
}

export const route: RouteObject = {
  path: '',
  element: <Manager />,
  children: [
    subRoute('', dashboardRoute),
    { path: 'candidates', element: <Candidates /> },
  ],
}
