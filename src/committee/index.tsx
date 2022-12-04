import { message } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { getToken } from '../utils/token-helper'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import UserStore from '../stores/user'
import Candidates from './Candidates'
import CompletedCandidates from './CompletedCandidates'
import Dashboard from './Dashboard'
import IncompleteCandidates from './IncompleteCandidates'
import VoteCandidate from './VoteCandidate'
import { Outlet, Route, useNavigate } from 'react-router-dom'

const Committee = () => {
  const userStore = UserStore
  const navigate = useNavigate()

  if (!userStore.isAuthentication || !getToken()) {
    message.error('Unauthorized')
    navigate(`/`)
    return <p>Unauthorized</p>
  }

  if (userStore.profile.role !== 'committee') {
    navigate(`/${userStore.profile.role}`)
    return <p>Unauthorized</p>
  }

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

export default observer(Committee)

export const route = (
  <Route path="/committee" element={<Committee />}>
    <Route path="" element={<Dashboard />} />
    <Route path="all" element={<Candidates />} />
    <Route path="completed" element={<CompletedCandidates />} />
    <Route path="incomplete" element={<IncompleteCandidates />} />
    <Route path="candidate/:id" element={<VoteCandidate />} />
  </Route>
)
