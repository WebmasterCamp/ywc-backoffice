import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Form, Select, Button, Divider} from "antd";

import ProfileTable from "../ui/ProfileTable";
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

  @observable
  score = -1;

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

  handleSubmit = async () => {
    if (this.score < 0) {
      return noti("warning", "Alert", "โปรดเลือกคะแนนก่อนที่จะลงคะแนน");
    }

    this.loading = true;

    const response = await fetchWithToken(
      "grading/committee/vote",
      {id: this.getUserIdentity(), score: this.score},
      "POST",
    );

    this.loading = false;

    if (response.status === "success") {
      noti("success", "Success", "ให้คะแนนผู้สมัครเรียบร้อยแล้ว");
      this.hide = true;
    } else {
      noti("error", "Error", response.payload.message);
    }
  };

  updateScore = score => {
    this.score = +score;
  };

  render() {
    const {profile} = this.props.auth;

    return (
      <Fragment>
        <Padding>
          <div>id: {this.getUserIdentity()}</div>

          <Divider />
          <Label>รายละเอียดส่วนตัว</Label>

          <ProfileTable
            keys={[
              "ปีการศึกษา",
              "คณะ",
              "สาขาวิชา",
              "มหาลัย",
              "กิจกรรม",
              "คอมเม้นจาก Staff",
            ]}
            values={[
              this.candidate.academicYear,
              this.candidate.faculty,
              this.candidate.department,
              this.candidate.university,
              this.candidate.activities,
              `${this.candidate.staffComment} (${
                this.candidate.staffUsername
              })`,
            ]}
          />

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
          <Form style={{display: this.hide ? "none" : "block"}}>
            <FormItem>
              <Select
                showSearch
                style={{width: 150, marginRight: "10px"}}
                placeholder="Select Score"
                onChange={this.updateScore}
                optionFilterProp="children">
                <Select.Option value="0">0</Select.Option>
                <Select.Option value="1">1</Select.Option>
              </Select>
              <Button
                onClick={this.handleSubmit}
                loading={this.loading}
                type="primary">
                ให้คะแนน
              </Button>
            </FormItem>
          </Form>
        </Padding>
      </Fragment>
    );
  }
}
