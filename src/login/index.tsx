import { Button, Form, Icon, Input } from 'antd'
import React from 'react'
import styled from 'styled-components'

const FormItem = Form.Item

const Container = styled.div`
  width: 500px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  padding: 10px 20px;
  padding-top: 30px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`

const LoginButton = styled(Button)`
  width: 100%;
`

const Logo = styled.div`
  width: 250px;
  height: 130px;
  background: url(/logo.svg) center center no-repeat;
  background-size: auto 100%;

  position: absolute;
  top: calc(50% - 230px);
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`

interface LoginProps {
  loginWithToken: any
  auth: any
  form: any
  login: any
}

const LoginPage: React.FC = () => {
  return (
    <div>
      <Logo />
      <Container>
        <Form>
          <FormItem>
            <Input
              placeholder="Enter your username"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </FormItem>

          <FormItem>
            <Input
              placeholder="Enter your password"
              type="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </FormItem>

          <FormItem>
            <LoginButton type="primary" htmlType="submit">
              <Icon type="login" style={{ color: 'white' }} /> Login
            </LoginButton>
          </FormItem>
        </Form>
      </Container>
    </div>
  )
}

export default LoginPage
