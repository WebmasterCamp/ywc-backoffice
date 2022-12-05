import { message } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { getToken } from '../utils/token-helper'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import UserStore from '../stores/user'
import Dashboard from './Dashboard'
import Trackings from './Trackings'
import { Outlet, RouteObject, useNavigate } from 'react-router-dom'

const CallCenter = () => {
  const userStore = UserStore
  const navigate = useNavigate()

  if (!userStore.isAuthentication || !getToken()) {
    message.error('Unauthorized')
    navigate(`/`)
    return <p>Unauthorized</p>
  }

  if (userStore.profile.role !== 'callcenter') {
    navigate(`/${userStore.profile.role}`)
    return <p>Unauthorized</p>
  }

  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <PieChartOutlined />, label: 'แดชบอร์ด', key: '/staff' },
          {
            icon: 'pie-chart',
            label: 'ระบบติดตาม',
            children: [
              {
                icon: null,
                key: '/callcenter/tracking',
                label: 'การติดตามทั้งหมด',
              },
            ],
            key: '',
          },
        ]}
      >
        <Outlet />
      </MenuBar>
    </Fragment>
  )
}

export default observer(CallCenter)

export const route: RouteObject = {
  path: '',
  element: <CallCenter />,
  children: [
    { path: '', element: <Dashboard /> },
    { path: 'tracking', element: <Trackings /> },
  ],
}
