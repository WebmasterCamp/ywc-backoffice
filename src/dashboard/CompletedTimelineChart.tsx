import { Component } from 'react';
import Chart from 'react-apexcharts'

interface CompletedTimelineChartProps {
  dataframe: any[]
}

class CompletedTimelineChart extends Component<CompletedTimelineChartProps> {
  public label = (user: any) => {
    const { month, day, year } = user._id
    return `${day}/${month}/${year}`
  }

  public series = (users: any[]) => {
    return [
      {
        data: users
          .filter(x => x._id.month !== null)
          .map(user => ({
            x: this.label(user),
            y: user.count
          }))
      }
    ]
  }

  public renderCompletedTimeline = (users: any[]) => {
    const labels = users.map(this.label).filter(x => x !== 'null/null/null')

    return {
      chart: {
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      labels,
      series: this.series(users),
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        categories: labels
      }
    }
  }

  public render() {
    const { dataframe } = this.props
    const completedTimeline = this.renderCompletedTimeline(dataframe)
    const series = this.series(dataframe)

    return (
      <Chart
        options={completedTimeline}
        series={series}
        type="line"
        width="100%"
        height={500}
      />
    )
  }
}

export default CompletedTimelineChart
