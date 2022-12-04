import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'

import UserStore from '../stores/user'

import LogoSVG from '../assets/logo.svg'

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
  const userStore = useObservable(UserStore)

  useEffect(() => {
    userStore.checkAuthentication()
  }, [userStore])

  const handleSubmit = useCallback(
    (form: ILoginForm) => {
      userStore.authenticate(form.username, form.password)
    },
    [userStore]
  )

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

export default observer(LoginPage)
