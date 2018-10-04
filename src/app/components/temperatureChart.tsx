
/// <reference path="../../types/chart.d.ts" />
import * as React from "react"
import { Api } from "../../types";

type ChartProps = {}
type ChartState = {}

export class TemperatureChart extends React.Component<ChartProps, ChartState> {
    private element: HTMLCanvasElement

    constructor(props: ChartProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        let headers = new Headers()
        headers.append('content-type', 'application/json')

        fetch(`/api/weather/atmosphere?amount=-1`, { method: 'get', credentials: 'include', headers: headers })
            .then(res => res.json() as Promise<Array<Api.AtmosphereData>>)
            .then(json => json.map(j => ({ ...j, time: new Date(j.time) })))
            .then(json => this.drawChart(json))
    }

    drawChart(data: Array<Api.AtmosphereData>) {
        let ctx = this.element.getContext('2d')
        let labels = data.map(v => {let date = new Date(v.time); return date.getUTCHours() + ":" + date.getUTCMinutes()})
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