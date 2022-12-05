import { Fragment } from 'react'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import Candidates from './Candidates'
import CompletedCandidates from './CompletedCandidates'
import Dashboard from './Dashboard'
import IncompleteCandidates from './IncompleteCandidates'
import VoteCandidate from './VoteCandidate'
import { Outlet, RouteObject } from 'react-router-dom'

const Staff = () => {
  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <PieChartOutlined />, label: 'แดชบอร์ด', key: '/staff' },
          {
            icon: <PieChartOutlined />,
            label: 'ตรวจคำตอบ',
            children: [
              { icon: null, key: '/staff/all', label: 'ใบสมัครทั้งหมด' },
              {
                icon: null,
                label: 'ใบสมัครที่ตรวจไม่เสร็จ',
                key: '/staff/incomplete',
              },
              {
                icon: null,
                label: 'ใบสมัครที่ตรวจเสร็จ',
                key: '/staff/completed',
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
  element: <Staff />,
  children: [
    { path: '', element: <Dashboard /> },
    { path: 'all', element: <Candidates /> },
    { path: 'completed', element: <CompletedCandidates /> },
    { path: 'incomplete', element: <IncompleteCandidates /> },
    { path: 'candidate/:id', element: <VoteCandidate /> },
  ],
}
