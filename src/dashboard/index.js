import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {Button} from "antd";
import {CopyToClipboard} from "react-copy-to-clipboard";

import CompletedTimelineChart from "./CompletedTimelineChart";
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
  grid-template-columns: repeat(${({size}) => size}, 1fr);

  & > div {
    padding: 15px 0;

    & > h1 {
      font-size: 80px;
      font-weight: bold;
      font-family: sans-serif;

      color: #041527;
      margin: 0;
    }

    & > h2 {
      font-size: 60px;
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

const Desc = styled.span`
  display: block;
  margin-bottom: 20px;
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
  @observable
  userNotCompleted = 0;

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

    this.userNotCompleted = this.countUserNotCompleted(completedTimeline);
  };

  countUserNotCompleted = completedTimeline => {
    if (completedTimeline.length === 0) {
      return 0;
    }

    if (completedTimeline[0]._id.month === null) {
      return completedTimeline[0].count;
    }

    return 0;
  };

  componentDidMount = () => {
    this.fetchStat();
  };

  render() {
    return (
      <Fragment>
        <Padding>
          <MainStatContainer size={2}>
            <Panel>
              <h1>{this.totalCandidate}</h1>
              <span>ยอดผู้สมัครทั้งหมด</span>
            </Panel>
            <Panel>
              <h1>{this.userNotCompleted}</h1>
              <span>ยอดผู้สมัครที่ยังไม่ได้กดส่ง</span>
            </Panel>
          </MainStatContainer>
          <br />

          <MainStatContainer size={4}>
            <Panel>
              <h2>{this.programming}</h2>
              <span>ยอดผู้สมัครสาขา Programming</span>
            </Panel>
            <Panel>
              <h2>{this.marketing}</h2>
              <span>ยอดผู้สมัครสาขา Maketing</span>
            </Panel>
            <Panel>
              <h2>{this.content}</h2>
              <span>ยอดผู้สมัครสาขา Content</span>
            </Panel>
            <Panel>
              <h2>{this.design}</h2>
              <span>ยอดผู้สมัครสาขา Design</span>
            </Panel>
          </MainStatContainer>
          <br />

          <Heading>จำนวนผู้สมัครที่กรอกตาม STEP ต่างๆ</Heading>
          <Desc>
            NOTE: ตัวเลขที่อยู่ด้านหลังสาขาหมายความว่า ผ่าน STEP นั้นแล้วเช่น
            Programming: 1, 2 คือ สาขา Programming ที่ผ่าน STEP1, 2 แล้ว
            ถ้าไม่มีตัวเลขหมายความว่า ยังไม่ผ่าน STEP ไหนเลย
          </Desc>
          <CountUserStepChart dataframe={this.countUserStep} />

          <Heading>จำนวนผู้ส่งใบสมัครตามช่วงเวลาต่างๆ</Heading>
          <CompletedTimelineChart dataframe={this.completedTimeline} />

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
