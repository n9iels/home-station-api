export namespace Api {
    export interface AtmosphereAddData {
        temperature: number
        humidity: number
        heatIndex: number
    }

    export interface AtmosphereData {
        id: number
        temperature: number
        humidity: number
        heatIndex: number
        createdAt: Date
        updatedAt: Date
    }

    export interface WindspeedAddData {
        readings: number[]
    }


    export interface WindspeedData {
        average_speed: number[]
        createAt: Date
        updatedAt: Date
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