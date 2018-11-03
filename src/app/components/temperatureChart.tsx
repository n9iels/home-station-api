import * as React from "react"
import { Line } from 'react-chartjs-2'
import { Api } from "../../types"

type ChartProps = {
    key: any
    atmosData: Array<Api.AtmosphereData>
}
type ChartState = {}

export class TemperatureChart extends React.Component<ChartProps, ChartState> {

    constructor(props: ChartProps) {
        super(props)
        this.state = {}
    }

    chartData() {
        let labels = this.props.atmosData.map(v => { let date = new Date(v.createdAt); return date.getUTCHours() + ":" + date.getUTCMinutes() })
        let tempData = this.props.atmosData.map(d => d.temperature)
        let heatData = this.props.atmosData.map(d => d.heatIndex)

        return {
            labels: labels,
            offset: true,
            datasets: [{
                label: 'Temperatuur',
                backgroundColor: 'rgb(86, 129, 179)',
                borderColor: 'rgb(86, 129, 179)',
                fill: false,
                lineTension: 0.2,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: tempData,
            },
            {
                label: 'Gevoelstemperatur',
                backgroundColor: 'rgb(255, 98, 132)',
                borderColor: 'rgb(255, 98, 132)',
                fill: false,
                lineTension: 0.2,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: heatData,
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