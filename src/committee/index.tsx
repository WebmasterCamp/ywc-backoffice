import React, { Component, Fragment } from 'react'
import { Route } from 'react-router'

import MenuBar from '../common/MenuBar'
import Candidates from './Candidates'
import VoteCandidate from './VoteCandidate'

export default class Committee extends Component {
  public getUserIdentity = () => {
    const url = window.location.href.split('/')
    return url[url.length - 1]
  }

  public render() {
    return (
      <Fragment>
        <MenuBar
          header={`คัดผู้เข้าสมัครแต่ละสาขา (Committee)`}
          menus={[{ icon: 'user', name: 'คัดคนเข้าสมัคร', to: '/committee' }]}
        >
          <Route path="/committee" exact={true} component={Candidates} />
          <Route path="/committee/:id" component={VoteCandidate} />
        </MenuBar>
      </Fragment>
    )
  }
}
