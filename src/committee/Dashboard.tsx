import { observer } from 'mobx-react-lite'
import React from 'react'

import MainStatContainer from '../common/MainStatContainer'
import ProfileBox from '../common/ProfileBox'
import Box from '../ui/Box'
import { Heading } from '../utils/styled-helper'

const Dashboard = () => {
  return (
    <>
      <ProfileBox />
      <Heading>สถาณะของท่าน</Heading>
      <MainStatContainer size={3}>
        <Box>
          <h1>132</h1>
          <span>ยอดผู้สมัครที่ท่านตรวจแล้ว</span>
        </Box>
        <Box>
          <h1>343</h1>
          <span>ยอดผู้สมัครที่ท่านยังตรวจไม่เสร็จ</span>
        </Box>
        <Box>
          <h1>64%</h1>
          <span>เปอร์เซ็นต์การตรวจของท่าน</span>
        </Box>
      </MainStatContainer>
    </>
  )
}

export default observer(Dashboard)
