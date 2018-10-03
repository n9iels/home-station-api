export namespace Api {
    export interface AtmosphereData {
        temperature: number
        humidity: number
        heatIndex: number
    }

    export interface WindspeedData {
        rpm: number
    }

    export interface WeatherData {
        temperature: number
        humidity: number
        heatIndex: number
        windspeed: number
        time: number
    }
}