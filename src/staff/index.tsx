import React, { Component, Fragment } from 'react'
import { Route } from 'react-router'

import MenuBar from '../common/MenuBar'
import Candidates from './Candidates'
import CompletedCandidates from './CompletedCandidates'
import Dashboard from './Dashboard'
import IncompleteCandidates from './IncompleteCandidates'
import VoteCandidate from './VoteCandidate'

// import VoteCandidate from './VoteCandidate'

export default class Committee extends Component {
  public getUserIdentity = () => {
    const url = window.location.href.split('/')
    return url[url.length - 1]
  }

  public render() {
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
}
