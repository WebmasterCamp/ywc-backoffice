import { Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import UserStore from '../stores/user'

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

interface ILoginForm {
  username: string
  password: string
}

const LoginPage: React.FC = () => {
  const userStore = useObservable(UserStore)

  const handleSubmit = useCallback(
    (form: ILoginForm) => {
      userStore.authenticate(form.username, form.password)
    },
    [userStore]
  )

  // Login Form Template
  type LoginFormProps = FormComponentProps
  function LoginFormImpl(props: LoginFormProps): JSX.Element {
    const { form } = props
    const { getFieldDecorator, validateFields } = form

    const onSubmit = (event: React.FormEvent) => {
      event.preventDefault()

      validateFields((err, values) => {
        if (!err) {
          handleSubmit(values)
        }
      })
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              placeholder="Enter your username"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }]
          })(
            <Input
              placeholder="Enter your password"
              type="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </FormItem>

        <FormItem>
          <LoginButton type="primary" htmlType="submit">
            <Icon type="login" style={{ color: 'white' }} /> Login
          </LoginButton>
        </FormItem>
      </Form>
    )
  }

  const LoginForm = Form.create()(LoginFormImpl)

  return (
    <>
      <Logo />
      <Container>
        <LoginForm />
      </Container>
    </>
  )
}

export default observer(LoginPage)
