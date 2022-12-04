import { message } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Route } from 'react-router'
import { getToken } from '../utils/token-helper'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import Dashboard from '../dashboard'
import Candidates from '../dashboard/Candidates'
import Trackings from '../dashboard/Trackings'
import UserStore from '../stores/user'
import CandidateFinalist from './CandidateFinalist'
import CandidateInterview from './CandidateInterview'
import CommitteeStatus from './CommitteeStatus'
import { useHistory } from 'react-router-dom'

const Admin = () => {
  const userStore = UserStore
  const history = useHistory()

  if (!userStore.isAuthentication || !getToken()) {
    message.error('Unauthorized')
    history.push(`/`)
    return <p>Unauthorized</p>
  }

  if (userStore.profile.role !== 'admin') {
    history.push(`/${userStore.profile.role}`)
    return <p>Unauthorized</p>
  }

  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <PieChartOutlined />, label: 'แดชบอร์ด', key: '/admin' },
          {
            icon: <PieChartOutlined />,
            label: 'ผู้เข้าสมัครทั้งหมด',
            key: '/admin/candidates'
          },
          {
            icon: <PieChartOutlined />,
            label: 'สถานะการตรวจใบสมัคร',
            key: '/admin/status'
          },
          {
            icon: <PieChartOutlined />,
            label: 'คัดเลือกเข้าสัมภาษณ์',
            children: [
              {
                icon: null,
                label: 'สาขาคอนเทนท์',
                key: '/admin/candidates/content'
              },
              {
                icon: null,
                label: 'สาขาดีไซน์',
                key: '/admin/candidates/design'
              },
              {
                icon: null,
                label: 'สาขามาร์เก็ตติ้ง',
                key: '/admin/candidates/marketing'
              },
              {
                icon: null,
                label: 'สาขาโปรแกรมมิ่ง',
                key: '/admin/candidates/programming'
              }
            ],
            key: 'a'
          },
          {
            icon: <PieChartOutlined />,
            label: 'คัดเลือกเข้าค่าย',
            children: [
              {
                icon: null,
                label: 'สาขาคอนเทนท์',
                key: '/admin/finalist/content'
              },
              {
                icon: null,
                label: 'สาขาดีไซน์',
                key: '/admin/finalist/design'
              },
              {
                icon: null,
                label: 'สาขามาร์เก็ตติ้ง',
                key: '/admin/finalist/marketing'
              },
              {
                icon: null,
                label: 'สาขาโปรแกรมมิ่ง',
                key: '/admin/finalist/programming'
              }
            ],
            key: 'b'
          },
          {
            icon: <PieChartOutlined />,
            label: 'ระบบติดตาม',
            children: [
              {
                icon: null,
                label: 'สร้างการติดตาม',
                key: '/admin/tracking/candidates'
              }
            ],
            key: ''
          }
        ]}
      >
        <Route path="/admin/" exact={true} component={Dashboard} />
        <Route path="/admin/candidates" exact={true} component={Candidates} />
        <Route
          path="/admin/candidates/:major"
          exact={true}
          component={CandidateInterview}
        />
        <Route
          path="/admin/finalist/:major"
          exact={true}
          component={CandidateFinalist}
        />
        <Route path="/admin/status" exact={true} component={CommitteeStatus} />
        <Route
          path="/admin/tracking/candidates"
          exact={true}
          component={Trackings}
        />
      </MenuBar>
    </Fragment>
  )
}

export default observer(Admin)
