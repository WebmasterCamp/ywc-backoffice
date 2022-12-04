import { Table } from 'antd'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table/interface'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

import MainStatContainer from '../common/MainStatContainer'
import ProfileBox from '../common/ProfileBox'
import GroupByUniversity from '../interfaces/GroupByUniversity'
import DashboardStore from '../stores/dashboard'
import Box from '../ui/Box'
import { DashboardTitle } from '../utils/styled-helper'

const Dashboard = () => {
  const dashboardStore = DashboardStore

  const [pagination, setPagination] = useState({})

  const onPageChange = (p: TablePaginationConfig) => {
    setPagination(p)
  }

  const columns: ColumnType<GroupByUniversity>[] = [
    {
      key: 'name',
      render: (user: GroupByUniversity) => <span>{user.name}</span>,

      title: 'มหาวิทยาลัย'
    },
    {
      key: 'value',
      render: (user: GroupByUniversity) => <span>{user.value}</span>,
      sortOrder: 'descend',
      sorter: (a, b) => a.value - b.value,
      title: 'จำนวน'
    }
  ]

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
      <DashboardTitle>จำนวนผู้สมัครที่กำลังกรอกใบสมัคร</DashboardTitle>
      <MainStatContainer size={5}>
        <Box>
          <h2>{dashboardStore.stepStat.info}</h2>
          <span>ข้อมูลส่วนตัว</span>
        </Box>
        <Box>
          <h2>{dashboardStore.stepStat.contact}</h2>
          <span>ข้อมูลการติดต่อ</span>
        </Box>
        <Box>
          <h2>{dashboardStore.stepStat.general}</h2>
          <span>คำถามกลาง</span>
        </Box>
        <Box>
          <h2>{dashboardStore.stepStat.major}</h2>
          <span>คำถามสาขา</span>
        </Box>
        <Box>
          <h2>{dashboardStore.stepStat.summary}</h2>
          <span>ยืนยันใบสมัคร</span>
        </Box>
      </MainStatContainer>
      <DashboardTitle>จำนวนผู้สมัครค่ายของแต่ละมหาวิทยาลัย</DashboardTitle>
      <MainStatContainer size={1}>
        <Table
          className="candidates-table"
          columns={columns}
          rowKey={(university: GroupByUniversity, index?: number) =>
            university.name
          }
          dataSource={dashboardStore.universityStat}
          onChange={onPageChange}
          pagination={pagination}
        />
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
