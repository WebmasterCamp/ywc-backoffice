import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainStatContainer from '../common/MainStatContainer'
import ProfileBox from '../common/ProfileBox'
import CommitteeStatusStore from '../stores/committeeStatus'
import Box from '../ui/Box'
import { MAJOR } from '../utils/const'
import { DashboardTitle } from '../utils/styled-helper'

const CommitteeStatus = () => {
  const committeeStatusStore = useObservable(CommitteeStatusStore)

  useEffect(() => {
    committeeStatusStore.getApplicationStatus()
  }, [committeeStatusStore])

  return (
    <>
      <ProfileBox />
      <DashboardTitle>สถานะการตรวจใบสมัคร</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.staffStatus.map(user => (
          <Box key={user.username}>
            <h1>
              {Math.floor(
                (user.status.checkedApplications /
                  user.status.allApplications) *
                  100
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
      <DashboardTitle>กรรมการสาขา{MAJOR('content')}</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.contentCommittee.map(user => (
          <Box key={user.username}>
            <h1>
              {Math.floor(
                (user.status.checkedApplications /
                  user.status.allApplications) *
                  100
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
      <DashboardTitle>กรรมการสาขา{MAJOR('design')}</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.designCommittee.map(user => (
          <Box key={user.username}>
            <h1>
              {Math.floor(
                (user.status.checkedApplications /
                  user.status.allApplications) *
                  100
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
      <DashboardTitle>กรรมการสาขา{MAJOR('marketing')}</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.marketingCommittee.map(user => (
          <Box key={user.username}>
            <h1>
              {Math.floor(
                (user.status.checkedApplications /
                  user.status.allApplications) *
                  100
              )}
              %
            </h1>
            <span>{user.username}</span>
          </Box>
        ))}
      </MainStatContainer>
      <DashboardTitle>กรรมการสาขา{MAJOR('programming')}</DashboardTitle>
      <MainStatContainer size={4}>
        {committeeStatusStore.programmingCommittee.map(user => (
          <Box key={user.username}>
            <h1>
              {Math.floor(
                (user.status.checkedApplications /
                  user.status.allApplications) *
                  100
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

export default observer(CommitteeStatus)
