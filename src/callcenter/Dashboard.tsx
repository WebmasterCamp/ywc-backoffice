import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import ProfileBox from '../common/ProfileBox'
import StaffStore from '../stores/staff'

const Dashboard = () => {
  const staffStore = useObservable(StaffStore)

  useEffect(() => {
    staffStore.getCommitteeStatus()
  }, [staffStore])

  return (
    <>
      <ProfileBox />
    </>
  )
}

export default observer(Dashboard)
