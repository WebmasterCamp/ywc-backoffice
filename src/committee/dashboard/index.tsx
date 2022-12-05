import { useLoaderData } from 'react-router-dom'

import MainStatContainer from '../../common/MainStatContainer'
import ProfileBox from '../../common/ProfileBox'
import Box from '../../ui/Box'
import { DashboardTitle } from '../../utils/styled-helper'
import { loader, LoaderData } from './loader'

const Dashboard = () => {
  const { committeeStatus } = useLoaderData() as LoaderData

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

export const dashboardRoute = {
  path: '',
  loader,
  element: <Dashboard />,
}
