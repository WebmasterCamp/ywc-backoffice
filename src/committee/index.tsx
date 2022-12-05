import { Fragment } from 'react'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import { dashboardRoute } from './dashboard'
import { candidatesRoute } from './candidates'
import { Outlet, RouteObject } from 'react-router-dom'

const Committee = () => {
  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <PieChartOutlined />, label: 'แดชบอร์ด', key: '/committee' },
          {
            icon: <PieChartOutlined />,
            label: 'ตรวจคำตอบ',
            children: [
              { icon: null, key: '/committee/all', label: 'ใบสมัครทั้งหมด' },
              {
                icon: null,
                label: 'ใบสมัครที่ตรวจไม่เสร็จ',
                key: '/committee/incomplete',
              },
              {
                icon: null,
                label: 'ใบสมัครที่ตรวจเสร็จ',
                key: '/committee/completed',
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
  element: <Committee />,
  children: [dashboardRoute, candidatesRoute],
}
