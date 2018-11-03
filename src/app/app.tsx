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
        let today = Moment().format('YYYY-MM-DD');
        let tomorrow = Moment().add(1, 'days').format('YYYY-MM-DD');
        
        let headers = new Headers()
        headers.append('content-type', 'application/json')

        fetch(`/api/weather/atmosphere?from=${today}&to=${tomorrow}`, { method: 'get', credentials: 'include', headers: headers })
            .then(res => res.json() as Promise<Array<Api.AtmosphereData>>)
            .then(json => json.map(j => ({ ...j, createdAt: new Date(j.createdAt), updatedAt: new Date(j.updatedAt) })))
            .then(json => this.setState({ atmosphereData: json }))
    }


    getWindspeedData() {
        let today = Moment().format('YYYY-MM-DD');
        let tomorrow = Moment().add(1, 'days').format('YYYY-MM-DD');

        let headers = new Headers()
        headers.append('content-type', 'application/json')

        fetch(`/api/weather/wind?from=${today}&to=${tomorrow}`, { method: 'get', credentials: 'include', headers: headers })
            .then(res => res.json() as Promise<Array<Api.WindspeedData>>)
            .then(json => this.setState({ windspeedData: json }))
    }

    render() {
        return this.state.atmosphereData == 'loading' || this.state.windspeedData == 'loading' ? null : <>
            <div className="app__left">
                <div className="atmosphere">
                    <div className="atmosphere__temp">
                        {this.state.atmosphereData[0].temperature}<span>&deg;</span>
                    </div>
                    <div className="atmosphere__location">
                        Gouda
                    </div>
                </div>
            </div>
            <div className="app__right">
                <div className="app__right__content">
                    <TemperatureChart data={this.state.atmosphereData} />
                </div>
                <div className="app__right__bottom">
                    <ul>
                        <li><span className="icon-droplet"></span> {this.state.atmosphereData[0].humidity}%</li>
                        <li><span className="icon-leaf"></span> {this.state.windspeedData[0].average_speed} km/h</li>
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