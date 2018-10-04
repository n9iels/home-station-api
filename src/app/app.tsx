import * as React from "react"
import * as ReactDOM from "react-dom"
import { Api } from "../types";
import { TemperatureChart } from "./components/temperatureChart";

type AppProps = {}
type AppState = {
    atmosphereData: Api.AtmosphereData | 'loading'
    windspeedData: Api.WindspeedData | 'loading'
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = { atmosphereData: 'loading', windspeedData: 'loading' }
    }

    componentDidMount() {
        this.getAtmosphereData()
        this.getWindspeedData()
    }

    getAtmosphereData() {
        let headers = new Headers()
        headers.append('content-type', 'application/json')

        fetch(`/api/weather/atmosphere`, { method: 'get', credentials: 'include', headers: headers })
            .then(res => res.json() as Promise<Array<Api.AtmosphereData>>)
            .then(json => json.map(j => ({ ...j, time: new Date(j.time) })))
            .then(json => this.setState({ atmosphereData: json[0] }))
    }


    getWindspeedData() {
        let headers = new Headers()
        headers.append('content-type', 'application/json')

        fetch(`/api/weather/wind`, { method: 'get', credentials: 'include', headers: headers })
            .then(res => res.json() as Promise<Array<Api.WindspeedData>>)
            .then(json => this.setState({ windspeedData: json[0] }))
    }

    render() {
        return this.state.atmosphereData == 'loading' || this.state.windspeedData == 'loading' ? null : <>
            <div className="app__left">
                <div className="atmosphere">
                    <div className="atmosphere__temp">
                        {this.state.atmosphereData.temperature}<span>&deg;</span>
                    </div>
                    <div className="atmosphere__location">
                        Gouda
                    </div>
                </div>
            </div>
            <div className="app__right">
                <div className="app__right__content">
                    <TemperatureChart />
                </div>
                <div className="app__right__bottom">
                    <ul>
                        <li><span className="icon-droplet"></span> {this.state.atmosphereData.humidity}%</li>
                        <li><span className="icon-leaf"></span> {this.state.windspeedData.rpm} km/h</li>
                    </ul>
                </div>
            </div>
        </>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
)