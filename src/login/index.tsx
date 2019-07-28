import { Button, Form, Icon, Input } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import styled from 'styled-components'

import { getQueryParam } from '../utils/helper'
import { userLogin, userLoginWithToken } from './reducer'

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

const mapStateToProps = (state: any) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
  login: (values: any) => dispatch(userLogin(values)),
  loginWithToken: () => dispatch(userLoginWithToken)
})

export default class Login extends Component {
  // automate login with access token
  public componentDidMount = () => {
    const token = window.localStorage.getItem('token')
    const { auth } = this.props

    if (!auth.isAuthen && token) {
      this.props.loginWithToken()
    }
  }

  public handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    })
  }

  public render() {
    const { auth } = this.props
    const { getFieldDecorator } = this.props.form

    if (auth.isAuthen) {
      const nextLocation = getQueryParam('location')

      if (nextLocation !== null && nextLocation !== '') {
        return <Redirect to={`/${nextLocation}`} />
      }

      return <Redirect to={`/${auth.profile.role}`} />
    }

    return (
      <div>
        <Logo />
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  placeholder="Enter your username"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your password!' }
                ]
              })(
                <Input
                  placeholder="Enter your password"
                  type="password"
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
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
}
