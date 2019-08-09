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
            { icon: 'pie-chart', name: 'แดชบอร์ด', to: '/admin' },
            {
              icon: 'pie-chart',
              name: 'ผู้เข้าสมัครทั้งหมด',
              to: '/admin/candidates'
            },
            {
              icon: 'pie-chart',
              name: 'คัดเลือกเข้าสัมภาษณ์',
              submenu: [
                {
                  icon: '',
                  name: 'สาขาคอนเทนท์',
                  to: '/admin/candidates/1'
                },
                {
                  icon: '',
                  name: 'สาขาดีไซน์',
                  to: '/admin/candidates/2'
                },
                {
                  icon: '',
                  name: 'สาขามาร์เก็ตติ้ง',
                  to: '/admin/candidates/3'
                },
                {
                  icon: '',
                  name: 'สาขาโปรแกรมมิ่ง',
                  to: '/admin/candidates/4'
                }
              ],
              to: ''
            }
          ]}
        >
          <Route path="/admin/" exact={true} component={Dashboard} />
          <Route path="/admin/candidates" exact={true} component={Candidates} />
        </MenuBar>
      </Fragment>
    )
  }
}
