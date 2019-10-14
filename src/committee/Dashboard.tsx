import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainStatContainer from '../common/MainStatContainer'
import ProfileBox from '../common/ProfileBox'
import CommitteeStore from '../stores/committee'
import Box from '../ui/Box'
import { DashboardTitle } from '../utils/styled-helper'

const Dashboard = () => {
  const committeeStore = useObservable(CommitteeStore)

  useEffect(() => {
    committeeStore.getCommitteeStatus()
  }, [committeeStore])

  const { committeeStatus } = committeeStore

  return (
    <>
      <ProfileBox />
      <DashboardTitle>สถานะของท่าน</DashboardTitle>
      <MainStatContainer size={3}>
        <Box>
          <h1>{committeeStatus.checked}</h1>
          <span>ยอดผู้สมัครที่ท่านตรวจแล้ว</span>
        </Box>
        <Box>
          <h1>{committeeStatus.notChecked}</h1>
          <span>ยอดผู้สมัครที่ท่านยังตรวจไม่เสร็จ</span>
        </Box>
        <Box>
          <h1>{committeeStatus.percent}%</h1>
          <span>เปอร์เซ็นต์การตรวจของท่าน</span>
        </Box>
        <Box>
          <h1>{committeeStatus.pass}</h1>
          <span>จำนวนผู้สมัครที่ผ่าน</span>
        </Box>
        <Box>
          <h1>{committeeStatus.notPass}</h1>
          <span>จำนวนผู้สมัครที่ไม่ผ่าน</span>
        </Box>
      </MainStatContainer>
    </>
  )
}

export default observer(Dashboard)
