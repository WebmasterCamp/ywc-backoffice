import React, { Component, Fragment } from 'react'
import { Route } from 'react-router'

import MenuBar from '../common/MenuBar'
import Dashboard from '../dashboard'
import Candidates from '../dashboard/Candidates'

export default class Admin extends Component {
  public getRoute: any = () => {
    const url = window.location.href.split('/')
    return url[url.length - 1]
  }

  public getHeader: any = () => ({
    admin: 'Dashboard',
    candidates: 'All Candidates'
  })

  public render() {
    return (
      <Fragment>
        <MenuBar
          header={this.getHeader()[this.getRoute()]}
          menus={[
            { icon: 'user', name: 'Dashboard', to: '/admin' },
            { icon: 'user', name: 'All Candidates', to: '/admin/candidates' }
          ]}
        >
          <Route path="/admin/" exact={true} component={Dashboard} />
          <Route path="/admin/candidates" exact={true} component={Candidates} />
        </MenuBar>
      </Fragment>
    )
  }
}
