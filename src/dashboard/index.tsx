import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import DashboardStore from '../stores/dashboard'
import Box from '../ui/Box'
import { Heading } from '../utils/styled-helper'

const MainStatContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  text-align: center;
  grid-template-columns: repeat(${({ size }: { size: number }) => size}, 1fr);

  & > div {
    padding: 15px 0;

    & > h1 {
      font-size: 80px;
      font-weight: bold;
      font-family: sans-serif;

      color: #041527;
      margin: 0;
    }

    & > h2 {
      font-size: 60px;
      font-weight: bold;
      font-family: sans-serif;

      color: #041527;
      margin: 0;
    }

    & > span {
      font-size: 18px;
      color: #595959;
      font-weight: bold;
    }
  }
`

// const Desc = styled.span`
//   display: block;
//   margin-bottom: 20px;
// `

const Dashboard = () => {
  const dashboardStore = useObservable(DashboardStore)

  useEffect(() => {
    dashboardStore.getDashboard()
  }, [dashboardStore])

  return (
    <>
      <Heading>ภาพรวมของผู้เข้าสมัครโครงการ</Heading>
      <MainStatContainer size={2}>
        <Box>
          <h1>{dashboardStore.totalCandidate}</h1>
          <span>ยอดผู้สมัครทั้งหมด</span>
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
