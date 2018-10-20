import React, {Component} from "react";
import Chart from "react-apexcharts";
import {PropTypes} from "prop-types";

class CountUserStepChart extends Component {
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
        data: users.filter(user => user._id.major !== undefined).map(user => ({
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
    const {dataframe} = this.props;
    const stepCount = this.renderStepCount(dataframe);
    const stepCountSeries = this.stepCountSeries(dataframe);

    return (
      <Chart
        options={stepCount}
        series={stepCountSeries}
        type="bar"
        width="100%"
        height={500}
      />
    );
  }
}

CountUserStepChart.propTypes = {
  dataframe: PropTypes.object.isRequired,
};

export default CountUserStepChart;
