import { useLoaderData } from 'react-router-dom'

import MainStatContainer from '../../common/MainStatContainer'
import ProfileBox from '../../common/ProfileBox'
import Box from '../../ui/Box'
import { MAJOR } from '../../utils/const'
import { DashboardTitle } from '../../utils/styled-helper'
import { loader, LoaderData } from './loader'

function displayPercentage(
  part: number | undefined,
  total: number | undefined
) {
  part = part ?? 0
  total = total ?? 0
  if (total === 0) {
    return 100
  }
  return Math.floor((part / total) * 100)
}

const CommitteeStatus = () => {
  const committeeStatusStore = useLoaderData() as LoaderData

  return (
    <>
      <ProfileBox />
      <DashboardTitle>สถานะการตรวจใบสมัคร</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.staffStatus.map((user) => (
          <Box key={user.username}>
            <h1>
              {displayPercentage(
                user.status.checkedApplications,
                user.status.allApplications
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
      <DashboardTitle>กรรมการสาขา{MAJOR('content')}</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.contentCommittee.map((user) => (
          <Box key={user.username}>
            <h1>
              {displayPercentage(
                user.status.checkedApplications,
                user.status.allApplications
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
      <DashboardTitle>กรรมการสาขา{MAJOR('design')}</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.designCommittee.map((user) => (
          <Box key={user.username}>
            <h1>
              {displayPercentage(
                user.status.checkedApplications,
                user.status.allApplications
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
      <DashboardTitle>กรรมการสาขา{MAJOR('marketing')}</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.marketingCommittee.map((user) => (
          <Box key={user.username}>
            <h1>
              {displayPercentage(
                user.status.checkedApplications,
                user.status.allApplications
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
      <DashboardTitle>กรรมการสาขา{MAJOR('programming')}</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.programmingCommittee.map((user) => (
          <Box key={user.username}>
            <h1>
              {displayPercentage(
                user.status.checkedApplications,
                user.status.allApplications
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
    </>
  )
}

export const committeeStatusRoute = {
  path: '',
  loader,
  element: <CommitteeStatus />,
}
