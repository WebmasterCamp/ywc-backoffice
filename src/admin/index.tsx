import { message } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Route } from 'react-router'
import history from '../utils/history'
import { getToken } from '../utils/token-helper'

import MenuBar from '../common/MenuBar'
import Dashboard from '../dashboard'
import Candidates from '../dashboard/Candidates'
import UserStore from '../stores/user'
import CandidateInterview from './CandidateInterview'
import CommitteeStatus from './CommitteeStatus'

const Admin = () => {
  const userStore = useObservable(UserStore)

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
          { icon: 'pie-chart', name: 'แดชบอร์ด', to: '/admin' },
          {
            icon: 'pie-chart',
            name: 'ผู้เข้าสมัครทั้งหมด',
            to: '/admin/candidates'
          },
          {
            icon: 'pie-chart',
            name: 'สถานะการตรวจใบสมัคร',
            to: '/admin/status'
          },
          {
            icon: 'pie-chart',
            name: 'คัดเลือกเข้าสัมภาษณ์',
            submenu: [
              {
                icon: '',
                name: 'สาขาคอนเทนท์',
                to: '/admin/candidates/content'
              },
              {
                icon: '',
                name: 'สาขาดีไซน์',
                to: '/admin/candidates/design'
              },
              {
                icon: '',
                name: 'สาขามาร์เก็ตติ้ง',
                to: '/admin/candidates/marketing'
              },
              {
                icon: '',
                name: 'สาขาโปรแกรมมิ่ง',
                to: '/admin/candidates/programming'
              }
            ],
            to: ''
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
        <Route path="/admin/status" exact={true} component={CommitteeStatus} />
      </MenuBar>
    </Fragment>
  )
}

export default observer(Admin)
