import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import { Avatar, Col, Row } from 'antd'
import ProfileBox from '../common/ProfileBox'
import CommitteeStore from '../stores/committee'
import UserStore from '../stores/user'
import Box from '../ui/Box'
import { MAJOR } from '../utils/const'
import { DashboardTitle } from '../utils/styled-helper'

const VoteCandidate = () => {
  const committeeStore = useObservable(CommitteeStore)
  const userStore = useObservable(UserStore)

  useEffect(() => {
    committeeStore.getCommitteeStatus()
  }, [committeeStore])

  return (
    <>
      <DashboardTitle>
        ตรวจใบสมัคร (สาขา{MAJOR(userStore.profile.major)})
      </DashboardTitle>
      <Box>
        <Row>
          <Col md={4} xl={2}>
            <Avatar shape="square" size={64} icon="user" />
          </Col>
          <Col md={14} xl={18} />
        </Row>
      </Box>
    </>
  )
}

export default observer(VoteCandidate)
