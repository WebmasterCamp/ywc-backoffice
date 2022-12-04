import { message } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react';
import { Route } from 'react-router'
import { getToken } from '../utils/token-helper'
import { UserOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import Dashboard from '../dashboard'
import Candidates from '../dashboard/Candidates'
import UserStore from '../stores/user'
import { useHistory } from 'react-router-dom'

const Manager = () => {
  const userStore = UserStore
  const history = useHistory()

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
          { icon: <UserOutlined />, label: 'Dashboard', key: '/manager' },
          {
            icon: <UserOutlined />,
            label: 'All Candidates',
            key: '/manager/candidates'
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
