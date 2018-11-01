import React, {Component} from "react";
import styled from "styled-components";
import {Redirect} from "react-router";
import {Form, Input, Icon, Button} from "antd";
import {connect} from "react-redux";

import {userLogin, userLoginWithToken} from "./reducer";
import {getQueryParam} from "../utils/helper";

const FormItem = Form.Item;

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
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const Logo = styled.div`
  width: 250px;
  height: 130px;
  background: url(/logo.svg) center center no-repeat;
  background-size: auto 100%;

  position: absolute;
  top: calc(50% - 230px);
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  login: values => dispatch(userLogin(values)),
  loginWithToken: () => dispatch(userLoginWithToken()),
});

@Form.create()
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Login extends Component {
  // automate login with access token
  componentDidMount = () => {
    const token = window.localStorage.getItem("token");
    const {auth} = this.props;

    if (!auth.isAuthen && token) {
      this.props.loginWithToken();
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render() {
    const {auth} = this.props;
    const {getFieldDecorator} = this.props.form;

    if (auth.isAuthen) {
      const nextLocation = getQueryParam("location");

      if (nextLocation !== null && nextLocation !== "") {
        return <Redirect to={`/${nextLocation}`} />;
      }

      return <Redirect to={`/${auth.profile.role}`} />;
    }

    return (
      <div>
        <Logo />
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("username", {
                rules: [
                  {required: true, message: "Please input your username!"},
                ],
              })(
                <Input
                  placeholder="Enter your username"
                  prefix={
                    <Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />
                  }
                />,
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {required: true, message: "Please input your password!"},
                ],
              })(
                <Input
                  placeholder="Enter your password"
                  type="password"
                  prefix={
                    <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />
                  }
                />,
              )}
            </FormItem>

            <FormItem>
              <LoginButton type="primary" htmlType="submit">
                <Icon type="login" style={{color: "white"}} /> Login
              </LoginButton>
            </FormItem>
          </Form>
        </Container>
      </div>
    );
  }
}
