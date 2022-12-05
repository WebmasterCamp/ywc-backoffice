import { message } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { getToken } from '../utils/token-helper'
import { UserOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import Dashboard from '../dashboard'
import Candidates from '../dashboard/Candidates'
import UserStore from '../stores/user'
import { Outlet, RouteObject, useNavigate } from 'react-router-dom'

const Manager = () => {
  const userStore = UserStore
  const navigate = useNavigate()

  if (!userStore.isAuthentication || !getToken()) {
    message.error('Unauthorized')
    navigate(`/`)
    return <p>Unauthorized</p>
  }

  if (userStore.profile.role !== 'manager') {
    navigate(`/${userStore.profile.role}`)
    return <p>Unauthorized</p>
  }

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

export default observer(Manager)

export const route: RouteObject = {
  path: '',
  element: <Manager />,
  children: [
    { path: '', element: <Dashboard /> },
    { path: 'candidates', element: <Candidates /> },
  ],
}
