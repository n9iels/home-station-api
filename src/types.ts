export namespace Api {
    export interface AtmosphereData {
        temperature: number
        humidity: number
    }

    export interface WindspeedData {
        rpm: number
    }

    export interface WeatherData {
        temperature: number
        humidity: number
        windspeed: number
        time: number
    }
}