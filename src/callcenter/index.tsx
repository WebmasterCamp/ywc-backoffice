import { message } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Route } from 'react-router'
import history from '../utils/history'
import { getToken } from '../utils/token-helper'

import MenuBar from '../common/MenuBar'
import UserStore from '../stores/user'
import Dashboard from './Dashboard'
import Trackings from './Trackings'

const CallCenter = () => {
  const userStore = useObservable(UserStore)

  if (!userStore.isAuthentication || !getToken()) {
    message.error('Unauthorized')
    history.push(`/`)
    return <p>Unauthorized</p>
  }

  if (userStore.profile.role !== 'callcenter') {
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
            name: 'ระบบติดตาม',
            submenu: [
              { icon: '', to: '/callcenter/tracking', name: 'การติดตามทั้งหมด' }
            ],
            to: ''
          }
        ]}
      >
        <Route path="/callcenter" exact={true} component={Dashboard} />
        <Route path="/callcenter/tracking" component={Trackings} />
      </MenuBar>
    </Fragment>
  )
}

export default observer(CallCenter)
