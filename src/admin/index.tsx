import { Fragment } from 'react'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import { dashboardRoute } from '../dashboard'
import Candidates from '../dashboard/Candidates'
import Trackings from '../dashboard/Trackings'
import CandidateFinalist from './CandidateFinalist'
import CandidateInterview from './CandidateInterview'
import CommitteeStatus from './CommitteeStatus'
import { Outlet, RouteObject } from 'react-router-dom'
import { subRoute } from '../utils/subRoute'

const Admin = () => {
  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <PieChartOutlined />, label: 'แดชบอร์ด', key: '/admin' },
          {
            icon: <PieChartOutlined />,
            label: 'ผู้เข้าสมัครทั้งหมด',
            key: '/admin/candidates',
          },
          {
            icon: <PieChartOutlined />,
            label: 'สถานะการตรวจใบสมัคร',
            key: '/admin/status',
          },
          {
            icon: <PieChartOutlined />,
            label: 'คัดเลือกเข้าสัมภาษณ์',
            children: [
              {
                icon: null,
                label: 'สาขาคอนเทนท์',
                key: '/admin/candidates/content',
              },
              {
                icon: null,
                label: 'สาขาดีไซน์',
                key: '/admin/candidates/design',
              },
              {
                icon: null,
                label: 'สาขามาร์เก็ตติ้ง',
                key: '/admin/candidates/marketing',
              },
              {
                icon: null,
                label: 'สาขาโปรแกรมมิ่ง',
                key: '/admin/candidates/programming',
              },
            ],
            key: 'a',
          },
          {
            icon: <PieChartOutlined />,
            label: 'คัดเลือกเข้าค่าย',
            children: [
              {
                icon: null,
                label: 'สาขาคอนเทนท์',
                key: '/admin/finalist/content',
              },
              {
                icon: null,
                label: 'สาขาดีไซน์',
                key: '/admin/finalist/design',
              },
              {
                icon: null,
                label: 'สาขามาร์เก็ตติ้ง',
                key: '/admin/finalist/marketing',
              },
              {
                icon: null,
                label: 'สาขาโปรแกรมมิ่ง',
                key: '/admin/finalist/programming',
              },
            ],
            key: 'b',
          },
          {
            icon: <PieChartOutlined />,
            label: 'ระบบติดตาม',
            children: [
              {
                icon: null,
                label: 'สร้างการติดตาม',
                key: '/admin/tracking/candidates',
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
  element: <Admin />,
  children: [
    subRoute('', dashboardRoute),
    { path: 'candidates', element: <Candidates /> },
    { path: 'candidates/:major', element: <CandidateInterview /> },
    { path: 'finalist/:major', element: <CandidateFinalist /> },
    { path: 'status', element: <CommitteeStatus /> },
    { path: 'tracking/candidates', element: <Trackings /> },
  ],
}
