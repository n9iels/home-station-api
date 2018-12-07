import * as React from "react"
import * as Moment from "moment"
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
        let labels = this.props.atmosData.map(v => Moment(v.createdAt).locale('nl').format('H:mm'))
        let tempData = this.props.atmosData.map(d => d.temperature)
        let heatData = this.props.atmosData.map(d => d.heatindex)
        console.log(heatData)

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
        return <Line data={() => this.chartData()} />
    }
}