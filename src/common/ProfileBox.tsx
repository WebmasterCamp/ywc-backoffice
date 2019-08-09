import { Avatar, Button, Col, Row } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React from 'react'
import UserStore from '../stores/user'
import Box from '../ui/Box'
import { Padding } from '../utils/styled-helper'

const ProfileBox = () => {
  const userStore = useObservable(UserStore)

  const handleLogout = () => {
    userStore.doLogout()
  }

  return (
    <Box>
      <Padding>
        <Row justify="space-between" gutter={8}>
          <Col md={4} xl={2}>
            <Avatar shape="square" size={64} icon="user" />
          </Col>
          <Col md={14} xl={18}>
            <b>ยินดีต้อนรับ</b>
            <br />
            คุณ คณิศร ชัยวิชาชาญ (กรรมการตรวจคำตอบกลาง)
          </Col>
          <Col md={6} xl={4} style={{ textAlign: 'right' }}>
            <Button icon="poweroff" onClick={handleLogout}>
              ออกจากระบบ
            </Button>
          </Col>
        </Row>
      </Padding>
    </Box>
  )
}

export default observer(ProfileBox)
