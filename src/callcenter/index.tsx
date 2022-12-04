import { message } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { Route } from 'react-router'
import { getToken } from '../utils/token-helper'
import { PieChartOutlined } from '@ant-design/icons'

import MenuBar from '../common/MenuBar'
import UserStore from '../stores/user'
import Dashboard from './Dashboard'
import Trackings from './Trackings'
import { useHistory } from 'react-router-dom'

const CallCenter = () => {
  const userStore = UserStore
  const history = useHistory()

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
          { icon: <PieChartOutlined />, label: 'แดชบอร์ด', key: '/staff' },
          {
            icon: 'pie-chart',
            label: 'ระบบติดตาม',
            children: [
              {
                icon: null,
                key: '/callcenter/tracking',
                label: 'การติดตามทั้งหมด',
              },
            ],
            key: '',
          },
        ]}
      >
        <Route path="/callcenter" exact={true} component={Dashboard} />
        <Route path="/callcenter/tracking" component={Trackings} />
      </MenuBar>
    </Fragment>
  )
}

export default observer(CallCenter)
