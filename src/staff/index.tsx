import { message } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Route } from 'react-router'
import history from '../utils/history'
import { getToken } from '../utils/token-helper'

import MenuBar from '../common/MenuBar'
import UserStore from '../stores/user'
import Candidates from './Candidates'
import CompletedCandidates from './CompletedCandidates'
import Dashboard from './Dashboard'
import IncompleteCandidates from './IncompleteCandidates'
import VoteCandidate from './VoteCandidate'

const Staff = () => {
  const userStore = useObservable(UserStore)

  if (!userStore.isAuthentication || !getToken()) {
    message.error('Unauthorized')
    history.push(`/`)
    return <p>Unauthorized</p>
  }

  if (userStore.profile.role !== 'staff') {
    history.push(`/${userStore.profile.role}`)
    return <p>Unauthorized</p>
  }

  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: 'pie-chart', name: 'แดชบอร์ด', to: '/staff' },
          {
            icon: 'pie-chart',
            name: 'ตรวจคำตอบ',
            submenu: [
              { icon: '', to: '/staff/all', name: 'ใบสมัครทั้งหมด' },
              {
                icon: '',
                name: 'ใบสมัครที่ตรวจไม่เสร็จ',
                to: '/staff/incomplete'
              },
              {
                icon: '',
                name: 'ใบสมัครที่ตรวจเสร็จ',
                to: '/staff/completed'
              }
            ],
            to: ''
          }
        ]}
      >
        <Route path="/staff" exact={true} component={Dashboard} />
        <Route path="/staff/all" component={Candidates} />
        <Route path="/staff/completed" component={CompletedCandidates} />
        <Route path="/staff/incomplete" component={IncompleteCandidates} />
        <Route path="/staff/candidate/:id" component={VoteCandidate} />
      </MenuBar>
    </Fragment>
  )
}

export default observer(Staff)
