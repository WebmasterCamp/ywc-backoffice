import { Fragment } from 'react'
import { UserOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'

import { Outlet, RouteObject } from 'react-router-dom'
import { subRoute } from '../utils/subRoute'
import { dashboardRoute } from '../dashboard'
import { candidatesRoute } from '../dashboard/candidates'

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
    subRoute('candidates', candidatesRoute),
  ],
}
