import React, {Component} from "react";
import styled from "styled-components";
import {Form, Input, Icon, Button} from "antd";

const FormItem = Form.Item;

const Container = styled.div`
  width: 500px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  padding: 10px 20px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Heading = styled.h1`
  margin: 0;
  margin-top: 15px;
  margin-bottom: 25px;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

@Form.create()
export default class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <Container>
          <Heading>YWC Grading System</Heading>

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
