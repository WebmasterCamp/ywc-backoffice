import { Component } from 'react';
import Chart from 'react-apexcharts'
import CountUserStep from '../interfaces/CountUserStep'

interface CountUserStepChartProps {
  dataframe: CountUserStep[]
}

class CountUserStepChart extends Component<CountUserStepChartProps> {
  public stepCountLabel = (user: any) => {
    const { major, stepContact, stepInfo, stepInsight, stepMajor } = user._id
    const label =
      major +
      ': ' +
      [stepContact, stepInfo, stepInsight, stepMajor]
        .map((x, i) => (x ? i + 1 : -1))
        .filter(x => x !== -1)
        .join(', ')

    return label
  }

  public stepCountSeries = (users: any[]) => {
    return [
      {
        data: users
          .filter(user => user._id.major !== undefined)
          .map(user => ({
            x: this.stepCountLabel(user),
            y: user.userCount
          }))
      }
    ]
  }

  public renderStepCount = (users: any[]) => {
    const categories = users
      .map(this.stepCountLabel)
      .filter(x => x.indexOf('undefined') === -1)

    return {
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: '55%',
          endingShape: 'rounded',
          horizontal: false
        }
      },
      stroke: {
        colors: ['transparent'],
        show: true,
        width: 2
      },
      xaxis: {
        categories
      },
      yaxis: {
        title: {
          text: 'Total Candidate'
        }
      }
    }
  }

  public render() {
    const { dataframe } = this.props
    const stepCount = this.renderStepCount(dataframe)
    const stepCountSeries = this.stepCountSeries(dataframe)

    return (
      <Chart
        options={stepCount}
        series={stepCountSeries}
        type="bar"
        width="100%"
        height={500}
      />
    )
  }
}

export default CountUserStepChart
