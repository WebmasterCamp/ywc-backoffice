import { Fragment } from 'react'
import { UserOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import Dashboard from '../dashboard'
import Candidates from '../dashboard/Candidates'

import { Outlet, RouteObject } from 'react-router-dom'

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
    { path: '', element: <Dashboard /> },
    { path: 'candidates', element: <Candidates /> },
  ],
}
