import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {Button} from "antd";
import {CopyToClipboard} from "react-copy-to-clipboard";

import CountUserStepChart from "./CountUserStepChart";
import Panel from "../ui/Panel";
import {authen} from "../utils/authen";
import {Padding, Heading} from "../utils/styled-helper";
import {observer} from "mobx-react";
import {fetchWithToken} from "../utils/fetch";
import {observable} from "mobx";

const MainStatContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);

  & > div {
    padding: 15px 0;

    & > h1 {
      font-size: 50px;
      font-weight: bold;
      font-family: sans-serif;

      color: #041527;
      margin: 0;
    }

    & > span {
      font-family: "Kanit";
      color: #6b67a7;
      font-size: 18px;
    }
  }
`;

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen(["admin", "manager"])
@connect(mapStateToProps)
@observer
export default class Dashboard extends Component {
  @observable
  totalCandidate = 0;
  @observable
  programming = 0;
  @observable
  content = 0;
  @observable
  design = 0;
  @observable
  marketing = 0;
  @observable
  completedTimeline = [];
  @observable
  countUserStep = [];

  fetchStat = async () => {
    const response = await fetchWithToken("users/stat/all", {}, "GET");

    if (response.status !== "success") {
      return;
    }

    const {
      totalCandidate,
      programming,
      content,
      design,
      marketing,
      completedTimeline,
      countUserStep,
    } = response.payload;

    this.totalCandidate = totalCandidate;
    this.programming = programming;
    this.content = content;
    this.design = design;
    this.marketing = marketing;

    this.completedTimeline = completedTimeline;
    this.countUserStep = countUserStep;
  };

  componentDidMount = () => {
    this.fetchStat();
  };

  render() {
    return (
      <Fragment>
        <Padding>
          <MainStatContainer>
            <Panel>
              <h1>{this.totalCandidate}</h1>
              <span>ยอดผู้สมัครทั้งหมด</span>
            </Panel>
            <Panel>
              <h1>{this.programming}</h1>
              <span>ยอดผู้สมัครสาขา Programming</span>
            </Panel>
            <Panel>
              <h1>{this.marketing}</h1>
              <span>ยอดผู้สมัครสาขา Maketing</span>
            </Panel>
            <Panel>
              <h1>{this.content}</h1>
              <span>ยอดผู้สมัครสาขา Content</span>
            </Panel>
            <Panel>
              <h1>{this.design}</h1>
              <span>ยอดผู้สมัครสาขา Design</span>
            </Panel>
          </MainStatContainer>
          <br />

          <Heading>จำนวนผู้สมัครที่กรอกตาม STEP ต่างๆ</Heading>
          <CountUserStepChart dataframe={this.countUserStep} />

          <CopyToClipboard
            style={{marginRight: "10px"}}
            text={JSON.stringify(this.countUserStep, 2, 2)}>
            <Button type="primary">
              Copy raw data to clipboard (CountUserStep)
            </Button>
          </CopyToClipboard>

          <CopyToClipboard text={JSON.stringify(this.completedTimeline, 2, 2)}>
            <Button type="primary">
              Copy raw data to clipboard (completedTimeline)
            </Button>
          </CopyToClipboard>
        </Padding>
      </Fragment>
    );
  }
}
