import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Form, Input, Icon, Button, Divider} from "antd";

import noti from "../utils/noti";
import {authen} from "../utils/authen";
import {fetch, fetchWithToken} from "../utils/fetch";

const FormItem = Form.Item;

const Padding = styled.div`
  padding: 20px;
  padding-bottom: 5px;
`;

const Heading = styled.div`
  font-family: "Kanit", sans-serif;
  font-size: 20px;
  padding: 10px 0;
  font-weight: bold;
`;

const Answer = styled.div`
  font-size: 18px;
  margin-bottom: 25px;
`;

const Label = styled.div`
  font-family: "Kanit", sans-serif;
  font-size: 18px;
  color: #777;

  margin-bottom: 10px;
`;

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen("committee")
@connect(mapStateToProps)
@Form.create()
@observer
export default class VoteCandidate extends Component {
  @observable
  generalQuestions = [];
  @observable
  generalAnswers = [];
  @observable
  majorQuestions = [];
  @observable
  majorAnswers = [];
  @observable
  candidate = {};
  @observable
  loading = false;
  @observable
  hide = false;

  getUserIdentity = () => {
    const url = window.location.href.split("/");
    return url[url.length - 1];
  };

  // fetch and render data
  componentDidMount = async () => {
    this.getQuestion();
    this.getCandidateData();
  };

  getQuestion = async () => {
    const response = await fetch("questions");

    if (response.status === "success") {
      this.generalQuestions = response.payload.general;
      this.majorQuestions = response.payload[this.props.auth.profile.major];
    }
  };

  getCandidateData = async () => {
    const response = await fetchWithToken(
      `users/committee/${this.getUserIdentity()}`,
      {},
      "GET",
    );

    console.log(response.payload, response.payload.questions.generalQuestions);

    if (response.status === "success") {
      this.candidate = response.payload;
      this.generalAnswers = response.payload.questions.generalQuestions.map(
        x => x.answer,
      );
      this.majorAnswers = response.payload.questions.majorQuestions.map(
        x => x.answer,
      );
    }
  };

  // judgement & comment
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.loading = true;

        const response = await fetchWithToken(
          "grading/staff/pass",
          {
            id: this.getUserIdentity(),
            ...values,
          },
          "POST",
        );

        this.loading = false;
        if (response.status === "success") {
          this.hide = true;
          noti("success", "Success", "ตรวจเรียบร้อยแล้ว");
        } else {
          noti("error", "Error", response.payload.message);
        }
      }
    });
  };

  handleEject = async () => {
    this.loading = true;

    const response = await fetchWithToken(
      "grading/staff/eject",
      {
        id: this.getUserIdentity(),
      },
      "POST",
    );

    this.loading = false;
    if (response.status === "success") {
      this.hide = true;
      noti("success", "Success", "คัดออกเรียบร้อยแล้ว");
    } else {
      noti("error", "Error", response.payload.message);
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {profile} = this.props.auth;

    return (
      <Fragment>
        <Padding>
          <div>id: {this.getUserIdentity()}</div>

          <Divider />
          <Label>รายละเอียดเพิ่มเติม</Label>
          <Answer>
            Academic Year: {this.candidate.academicYear}, Department:{" "}
            {this.candidate.department}, Faculty: {this.candidate.faculty},
            University: {this.candidate.university}
            <br />
            Activities: {this.candidate.activities}
            <br />
            Comment from Staff: {this.candidate.staffComment} (
            {this.candidate.staffUsername})
          </Answer>

          <Divider />
          <Label>คำถามกลาง</Label>
          {this.generalQuestions.map((question, i) => {
            return (
              <div key={i}>
                <Heading>
                  {i + 1}. {question}
                </Heading>
                <Answer>
                  <pre>{this.generalAnswers[i]}</pre>
                </Answer>
              </div>
            );
          })}

          <Divider />
          <Label>คำถามสาขา ({profile.major})</Label>
          {this.majorQuestions.map((question, i) => {
            return (
              <div key={i}>
                <Heading>
                  {i + 1}. {question}
                </Heading>
                <Answer>
                  <pre>{this.majorAnswers[i]}</pre>
                </Answer>
              </div>
            );
          })}

          <br />
          <Form
            style={{display: this.hide ? "none" : "block"}}
            onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("comment", {})(
                <Input.TextArea
                  rows={4}
                  placeholder="Leave your comment to committee..."
                />,
              )}
            </FormItem>

            <FormItem>
              <Button
                loading={this.loading}
                style={{marginRight: "10px"}}
                type="primary"
                htmlType="submit">
                <Icon type="check" style={{color: "white"}} /> ผ่านเข้ารอบ
              </Button>
              <Button
                loading={this.loading}
                type="dashed"
                onClick={this.handleEject}>
                <Icon type="close" style={{color: "#E23C39"}} /> คัดออก
              </Button>
            </FormItem>
          </Form>
        </Padding>
      </Fragment>
    );
  }
}
