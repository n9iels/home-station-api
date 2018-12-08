import '@babel/polyfill'
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Moment from "moment"
import { Api } from "../types";
import { TemperatureChart } from "./components/temperatureChart";

type AppProps = {}
type AppState = {
    atmosphereData: Array<Api.AtmosphereData> | 'loading'
    windspeedData: Array<Api.WindspeedData> | 'loading'
    date: Moment.Moment
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = { atmosphereData: 'loading', windspeedData: 'loading', date: Moment() }
    }

    componentDidMount() {
        this.getAtmosphereData()
        this.getWindspeedData()

        setInterval(() => this.getAtmosphereData(), 10000)
    }

    getAtmosphereData() {
        let from = Moment(this.state.date).format('YYYY-MM-DD')
        let to = Moment(this.state.date).add(1, 'days').format('YYYY-MM-DD')

        let headers = new Headers()
        headers.append('content-type', 'application/json')

        fetch(`/api/weather/atmosphere?from=${from}&to=${to}`, { method: 'get', credentials: 'include', headers: headers })
            .then(res => res.json() as Promise<Array<Api.AtmosphereData>>)
            .then(json => json.map(j => ({ ...j, createdAt: new Date(j.createdAt), updatedAt: new Date(j.updatedAt) })))
            .then(json => this.setState({ atmosphereData: json }))
    }


    getWindspeedData() {
        let from = Moment(this.state.date).format('YYYY-MM-DD')
        let to = Moment(this.state.date).add(1, 'days').format('YYYY-MM-DD')

        let headers = new Headers()
        headers.append('content-type', 'application/json')

        fetch(`/api/weather/wind?from=${from}&to=${to}`, { method: 'get', credentials: 'include', headers: headers })
            .then(res => res.json() as Promise<Array<Api.WindspeedData>>)
            .then(json => this.setState({ windspeedData: json }))
    }

    changeDate(days: number) {
        this.setState(prevState => ({ date: prevState.date.add(days, 'days') }), () => {
            this.getAtmosphereData()
            this.getWindspeedData()
        })
    }

    render() {
        return <div className="container">
            <div className="row">
                <main role="main" className="col-md-12">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard - <span className="text-secondary h3">{this.state.date.format("LL")}</span></h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group mr-2">
                                <button className="btn btn-sm btn-outline-secondary" onClick={_ => this.changeDate(-1)}>
                                    Vorige dag
                                </button>
                                <button className="btn btn-sm btn-outline-secondary" onClick={_ => this.changeDate(1)}>
                                    Volgende dag
                                </button>
                            </div>
                        </div>
                    </div>
                    {this.state.atmosphereData != 'loading' && this.state.windspeedData != 'loading' && <>
                        <div className="row mb-3">
                            <div className="col-md-6 text-center border-right">
                                <span className="icon-leaf h4 mr-3"></span>
                                <span className="h3">
                                    {this.state.windspeedData.length > 0 ? `${this.state.windspeedData[0].average_speed} Bft` : "-"}
                                </span>
                            </div>
                            <div className="col-md-6 text-center">
                                <span className="icon-droplet h4 mr-3"></span>
                                <span className="h3">
                                    {this.state.atmosphereData.length > 0 ? `${this.state.atmosphereData[0].humidity}%` : "-"}
                                </span>
                            </div>
                        </div>
                        <div className="chart-container pt-3 border-top">
                            <TemperatureChart
                                key={this.state.date.toString()}
                                atmosData={this.state.atmosphereData}
                            />
                        </div>
                    </>}
                </main>
            </div>
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
)