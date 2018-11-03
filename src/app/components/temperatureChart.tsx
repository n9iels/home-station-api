
/// <reference path="../../types/chart.d.ts" />
import * as React from "react"
import { Api } from "../../types";

type ChartProps = {
    data: Array<Api.AtmosphereData>
}
type ChartState = {}

export class TemperatureChart extends React.Component<ChartProps, ChartState> {
    private element: HTMLCanvasElement

    constructor(props: ChartProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.drawChart(this.props.data)
    }

    drawChart(data: Array<Api.AtmosphereData>) {
        let ctx = this.element.getContext('2d')
        let labels = data.map(v => { let date = new Date(v.createdAt); return date.getUTCHours() + ":" + date.getUTCMinutes() })
        let chartData = data.map(d => d.temperature)

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperatuur',
                    data: chartData,
                    backgroundColor: [
                        'rgba(112, 162, 220, 0.5)'
                    ],
                    borderColor: [
                        'rgba(86, 129, 179 ,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                spanGaps: true,
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }

    render() {
        return (
            <div className="chart-container">
                <canvas ref={el => this.element = el} height="650" width="1450" />
            </div>
        )
    }
}