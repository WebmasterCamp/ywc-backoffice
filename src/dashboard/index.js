import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import Chart from "react-apexcharts";

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

const chart = {
  options: {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

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

  stepCountLabel = user => {
    const {major, stepContact, stepInfo, stepInsight, stepMajor} = user._id;
    return (
      major +
      ": " +
      [stepContact, stepInfo, stepInsight, stepMajor]
        .map((x, i) => (x ? i + 1 : -1))
        .filter(x => x !== -1)
        .join(", ")
    );
  };

  stepCountSeries = users => {
    return [
      {
        data: users.map(user => ({
          x: this.stepCountLabel(user),
          y: user.userCount,
        })),
      },
    ];
  };

  renderStepCount = users => {
    return {
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "rounded",
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: users.map(this.stepCountLabel),
      },
      yaxis: {
        title: {
          text: "Total Candidate",
        },
      },
    };
  };

  render() {
    const stepCount = this.renderStepCount(this.countUserStep);
    const stepCountSeries = this.stepCountSeries(this.countUserStep);

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
          <Chart
            options={stepCount}
            series={stepCountSeries}
            type="bar"
            width="100%"
            height={400}
          />

          <Heading>จำนวนใบสมัครที่ส่งมาตามช่วงเวลาต่างๆ</Heading>
          <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            width="100%"
            height={400}
          />
        </Padding>
      </Fragment>
    );
  }
}
