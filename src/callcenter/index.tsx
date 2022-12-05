import { Fragment } from 'react'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import Dashboard from './Dashboard'
import { trackingRoute } from './tracking'
import { Outlet, RouteObject } from 'react-router-dom'

const CallCenter = () => {
  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <PieChartOutlined />, label: 'แดชบอร์ด', key: '/callcenter' },
          {
            icon: <PieChartOutlined />,
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

export const route: RouteObject = {
  path: '',
  element: <CallCenter />,
  children: [{ path: '', element: <Dashboard /> }, trackingRoute],
}
