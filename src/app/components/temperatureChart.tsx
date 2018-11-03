import * as React from "react"
import { Line } from 'react-chartjs-2'
import { Api } from "../../types"

type ChartProps = {
    data: Array<Api.AtmosphereData>
}
type ChartState = {}

export class TemperatureChart extends React.Component<ChartProps, ChartState> {

    constructor(props: ChartProps) {
        super(props)
        this.state = {}
    }

    chartData() {
        let labels = this.props.data.map(v => { let date = new Date(v.createdAt); return date.getUTCHours() + ":" + date.getUTCMinutes() })
        let chartData = this.props.data.map(d => d.temperature)

        return {
            labels: labels,
            offset: true,
            datasets: [{
                label: 'Temperatuur',
                backgroundColor: [
                    'rgba(112, 162, 220, 0.5)'
                ],
                borderColor: [
                    'rgba(86, 129, 179 ,1)'
                ],
                fill: false,
                lineTension: 0.1,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: chartData,
            }]
        }
    }

    render() {
        return (
            <div className="chart-container">
                <Line data={() => this.chartData()} />
            </div>
        )
    }
}