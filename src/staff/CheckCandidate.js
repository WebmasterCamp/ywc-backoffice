import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";

import {authen} from "../utils/authen";
import {fetch, fetchWithToken} from "../utils/fetch";

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

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen("staff")
@connect(mapStateToProps)
@observer
export default class CheckCandidate extends Component {
  @observable
  questions = [];
  @observable
  answers = [];

  getUserIdentity = () => {
    const url = window.location.href.split("/");
    return url[url.length - 1];
  };

  // fetch and render data
  componentDidMount = async () => {
    this.getQuestion();
    this.getAnswer();
  };

  getQuestion = async () => {
    const response = await fetch("questions");

    if (response.status === "success") {
      this.questions = response.payload.general;
    }
  };

  getAnswer = async () => {
    const response = await fetchWithToken(
      `users/staff/${this.getUserIdentity()}`,
      {},
      "GET",
    );

    if (response.status === "success") {
      this.answers = response.payload.map(x => x.answer);
    }
  };

  render() {
    return (
      <Fragment>
        <Padding>
          <div>id: {this.getUserIdentity()}</div>
          <br />
          {this.questions.map((question, i) => {
            return (
              <div key={i}>
                <Heading>
                  {i + 1}. {question}
                </Heading>
                <Answer>
                  <pre>{this.answers[i]}</pre>
                </Answer>
              </div>
            );
          })}
        </Padding>
      </Fragment>
    );
  }
}
