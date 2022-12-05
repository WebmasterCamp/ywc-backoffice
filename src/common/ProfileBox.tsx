import { Avatar, Button, Col, Row } from 'antd'
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons'
import { useStore } from 'zustand'
import Box from '../ui/Box'
import { MAJOR } from '../utils/const'
import { Padding } from '../utils/styled-helper'
import { authStore } from '../stores/auth'
import notification from '../utils/notification'

const ProfileBox = () => {
  const { profile, logout } = useStore(authStore, (state) => ({
    profile: state.user!.profile,
    logout: state.logout,
  }))

  const handleLogout = () => {
    logout()
    notification('success', 'Logout success!', 'Goodbye~')
  }

  const getRole = (role: string) => {
    switch (role) {
      case 'admin':
        return 'ผู้ดูแลระบบ'
      case 'manager':
        return 'ผู้จัดการค่าย'
      case 'staff':
        return 'กรรมการตรวจคำตอบกลาง'
      case 'committee':
        return `กรรมการตรวจคำตอบสาขา${MAJOR(profile.major)}`
    }
  }

  return (
    <Box>
      <Padding>
        <Row justify="space-between" gutter={8}>
          <Col md={4} xl={2}>
            <Avatar size={64} icon={<UserOutlined />} />
          </Col>
          <Col md={14} xl={18}>
            <b>ยินดีต้อนรับ</b>
            <br />
            คุณ {profile.username} ({getRole(profile.role)})
          </Col>
          <Col md={6} xl={4} style={{ textAlign: 'right' }}>
            <Button icon={<PoweroffOutlined />} onClick={handleLogout}>
              ออกจากระบบ
            </Button>
          </Col>
        </Row>
      </Padding>
    </Box>
  )
}

export default ProfileBox
