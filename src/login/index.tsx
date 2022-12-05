import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import { useStore } from 'zustand'
import { useCallback } from 'react'
import styled from '@emotion/styled'

import LogoSVG from '../assets/logo.svg'
import { Navigate, RouteObject } from 'react-router-dom'
import { authStore } from '../stores/auth'
import notification from '../utils/notification'

const FormItem = Form.Item

const Container = styled.div`
  width: 500px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  padding: 10px 20px;
  padding-top: 30px;

  text-align: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`

const LoginButton = styled(Button)`
  width: 100%;
`

const Logo = styled.img`
  width: 250px;
  height: 130px;
`

const Title = styled.h1`
  margin: 0.5em 0;
`

interface ILoginForm {
  username: string
  password: string
}

const LoginPage: React.FC = () => {
  const { user, authenticate } = useStore(authStore, (state) => ({
    user: state.user,
    authenticate: state.authenticate,
  }))

  const handleSubmit = useCallback(
    async (form: ILoginForm) => {
      try {
        await authenticate(form.username, form.password)
      } catch (e) {
        notification('error', 'Login Error', 'Username or Password incorrect')
      }
    },
    [authenticate]
  )

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Container>
        <Logo src={LogoSVG} />
        <Title>Back Office System</Title>
        <Form onFinish={handleSubmit}>
          <FormItem
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="ชื่อผู้ใช้งาน"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </FormItem>

          <FormItem
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              placeholder="รหัสผ่าน"
              type="password"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </FormItem>

          <FormItem>
            <LoginButton type="primary" htmlType="submit">
              <LoginOutlined style={{ color: 'white' }} /> เข้าสู่ระบบ
            </LoginButton>
          </FormItem>
        </Form>
      </Container>
    </>
  )
}

export const route: RouteObject = {
  path: '',
  element: <LoginPage />,
}
