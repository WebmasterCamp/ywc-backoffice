import { message } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Route } from 'react-router'
import history from '../utils/history'
import { getToken } from '../utils/token-helper'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import UserStore from '../stores/user'
import Candidates from './Candidates'
import CompletedCandidates from './CompletedCandidates'
import Dashboard from './Dashboard'
import IncompleteCandidates from './IncompleteCandidates'
import VoteCandidate from './VoteCandidate'

const Committee = () => {
  const userStore = useObservable(UserStore)

  if (!userStore.isAuthentication || !getToken()) {
    message.error('Unauthorized')
    history.push(`/`)
    return <p>Unauthorized</p>
  }

  if (userStore.profile.role !== 'committee') {
    history.push(`/${userStore.profile.role}`)
    return <p>Unauthorized</p>
  }

  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <PieChartOutlined />, name: 'แดชบอร์ด', to: '/committee' },
          {
            icon: <PieChartOutlined />,
            name: 'ตรวจคำตอบ',
            submenu: [
              { icon: null, to: '/committee/all', name: 'ใบสมัครทั้งหมด' },
              {
                icon: null,
                name: 'ใบสมัครที่ตรวจไม่เสร็จ',
                to: '/committee/incomplete'
              },
              {
                icon: null,
                name: 'ใบสมัครที่ตรวจเสร็จ',
                to: '/committee/completed'
              }
            ],
            to: ''
          }
        ]}
      >
        <Route path="/committee" exact={true} component={Dashboard} />
        <Route path="/committee/all" component={Candidates} />
        <Route path="/committee/completed" component={CompletedCandidates} />
        <Route path="/committee/incomplete" component={IncompleteCandidates} />
        <Route path="/committee/candidate/:id" component={VoteCandidate} />
      </MenuBar>
    </Fragment>
  )
}

export default observer(Committee)
