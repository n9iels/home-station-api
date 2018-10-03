import * as React from "react"
import * as ReactDOM from "react-dom"

type AppProps = {}
type AppState = {

}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {}
    }

    render() {
        return <p>BOE!</p>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("react-root")
)