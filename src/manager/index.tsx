import { message } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Route } from 'react-router'
import history from '../utils/history'
import { getToken } from '../utils/token-helper'
import { UserOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import Dashboard from '../dashboard'
import Candidates from '../dashboard/Candidates'
import UserStore from '../stores/user'

const Manager = () => {
  const userStore = useObservable(UserStore)

  if (!userStore.isAuthentication || !getToken()) {
    message.error('Unauthorized')
    history.push(`/`)
    return <p>Unauthorized</p>
  }

  if (userStore.profile.role !== 'manager') {
    history.push(`/${userStore.profile.role}`)
    return <p>Unauthorized</p>
  }

  return (
    <Fragment>
      <MenuBar
        menus={[
          { icon: <UserOutlined />, name: 'Dashboard', to: '/manager' },
          {
            icon: <UserOutlined />,
            name: 'All Candidates',
            to: '/manager/candidates'
          }
        ]}
      >
        <Route path="/manager" exact={true} component={Dashboard} />
        <Route path="/manager/candidates" exact={true} component={Candidates} />
      </MenuBar>
    </Fragment>
  )
}

export default observer(Manager)
