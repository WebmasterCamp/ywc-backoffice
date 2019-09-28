import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainStatContainer from '../common/MainStatContainer'
import ProfileBox from '../common/ProfileBox'
import DashboardStore from '../stores/dashboard'
import Box from '../ui/Box'
import { DashboardTitle } from '../utils/styled-helper'

const Dashboard = () => {
  const dashboardStore = useObservable(DashboardStore)

  useEffect(() => {
    dashboardStore.getDashboard()
  }, [dashboardStore])

  return (
    <>
      <ProfileBox />
      <DashboardTitle>ภาพรวมของผู้เข้าสมัครโครงการ</DashboardTitle>
      <MainStatContainer size={3}>
        <Box>
          <h1>{dashboardStore.totalCandidate}</h1>
          <span>ยอดผู้สมัครทั้งหมด</span>
        </Box>
        <Box>
          <h1>{dashboardStore.userCompleted}</h1>
          <span>ยอดผู้สมัครที่กดส่ง</span>
        </Box>
        <Box>
          <h1>{dashboardStore.userNotCompleted}</h1>
          <span>ยอดผู้สมัครที่ยังไม่ได้กดส่ง</span>
        </Box>
      </MainStatContainer>
      <br />

      <MainStatContainer size={4}>
        <Box>
          <h2>{dashboardStore.programming}</h2>
          <span>ยอดผู้สมัครสาขาโปรแกรมมิ่ง</span>
        </Box>
        <Box>
          <h2>{dashboardStore.marketing}</h2>
          <span>ยอดผู้สมัครสาขามาร์เก็ตติ้ง</span>
        </Box>
        <Box>
          <h2>{dashboardStore.content}</h2>
          <span>ยอดผู้สมัครสาขาคอนเทนท์</span>
        </Box>
        <Box>
          <h2>{dashboardStore.design}</h2>
          <span>ยอดผู้สมัครสาขาดีไซน์</span>
        </Box>
      </MainStatContainer>
      {/* <br />
        <br />

        <Heading>จำนวนผู้สมัครที่กรอกตาม STEP ต่างๆ</Heading>
        <Desc>
          NOTE: ตัวเลขที่อยู่ด้านหลังสาขาหมายความว่า ผ่าน STEP นั้นแล้วเช่น
          Programming: 1, 2 คือ สาขา Programming ที่ผ่าน STEP1, 2 แล้ว
          ถ้าไม่มีตัวเลขหมายความว่า ยังไม่ผ่าน STEP ไหนเลย
        </Desc>
        <CountUserStepChart dataframe={dashboardStore.countUserStep} />

        <Heading>จำนวนผู้ส่งใบสมัครตามช่วงเวลาต่างๆ</Heading>
        <CompletedTimelineChart dataframe={dashboardStore.completedTimeline} />

        <br />
        <br />

        <Button type="primary">
          Copy raw data to clipboard (CountUserStep)
        </Button>
        <Button type="primary">
          Copy raw data to clipboard (completedTimeline)
        </Button> */}
    </>
  )
}

export default observer(Dashboard)
