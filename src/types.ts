export namespace Api {
    export interface AtmosphereData {
        temperature: number
        humidity: number
        heatIndex: number
        time: Date
    }

    export interface WindspeedData {
        readings: number[]
    }

    export interface WeatherData {
        temperature: number
        humidity: number
        heatIndex: number
        windspeed: number
        time: number
    }
}

export namespace App {

    export type Action = ReceiveAtmosDataAction | ReceiveWindDataAction

    export interface ReceiveAtmosDataAction {
        type: 'RECEIVE_ATMOS_DATA'
        data: Array<Api.AtmosphereData>
    }

    export interface ReceiveWindDataAction {
        type: 'RECEIVE_WIND_DATA'
        data: Api.WindspeedData
    }
}