import * as Restify from "restify"
import { Api } from "../../types"
import { RedisHelper } from "../helpers/redisHelper";

export class WeahterApiController {
    /**
     * Redis Client
     */
    private redisHelper: RedisHelper

    constructor(redisHelper: RedisHelper) {
        this.redisHelper = redisHelper
    }

    /**
     * GET /api/weather/atmosphere
     * 
     * Get he most recent weahter data
     * 
     * @param req Restify Request object
     * @param res Restify Response object
     * @param next Restify Next function
     */
    public getAtmosphereData(req: Restify.Request, res: Restify.Response, next: Restify.Next) {
        let amountOfReadings = req.query.amount
        
        this.redisHelper.lrange('reading_atmosphere', 0, !amountOfReadings ? 0 : amountOfReadings -1)
            .then(readings => readings.map(timestamp => {
                return this.redisHelper.mget('temp_' + timestamp, 'hum_' + timestamp, 'heat_' + timestamp).then(values => {
                    return {
                        temperature: Number(values[0]),
                        humidity: Number(values[1]),
                        heatIndex: Number(values[2]),
                        time: Number(timestamp)
                    }
                })
            }))
            .then(promises => Promise.all(promises))
            .then(v => res.send(v))
            .catch(e => res.send(500, e))
    }

    /**
     * POST /api/weather/atmosphere
     * 
     * Handles creation of atmosphere data like temperature and humidity
     * 
     * @param req Restify Request object
     * @param res Restify Response object
     * @param next Restify Next function
     */
    public postAtmosphereData(req: Restify.Request, res: Restify.Response, next: Restify.Next) {
        let postData: Api.AtmosphereData = req.body

        if (!postData || !postData.humidity || !postData.temperature) {
            res.send(400)
            return
        }

        let timeStamp = new Date().getTime().toString()

        this.redisHelper.lpush('reading_atmosphere', timeStamp)
            .then(_ => this.redisHelper.set('hum_' + timeStamp, postData.humidity.toString()))
            .then(_ => this.redisHelper.set('temp_' + timeStamp, postData.temperature.toString()))
            .then(_ => this.redisHelper.set('heat_' + timeStamp, postData.heatIndex.toString()))
            .then(_ => this.redisHelper.lrange('reading_atmosphere', 203, -1)
                .then(readings => {
                    readings.forEach(timestamp => {
                        this.redisHelper.del('temp_' + timestamp)
                        this.redisHelper.del('hum_' + timestamp),
                        this.redisHelper.del('heat_' + timestamp)
                    })
                })
            )
            .then(_ => this.redisHelper.ltrim('reading', 0, 203))
            .then(_ => res.send(201))
            .catch(e => res.send(500, e))
    }

    /**
     * GET /api/weather/wind
     * 
     * Get he most recent weahter data
     * 
     * @param req Restify Request object
     * @param res Restify Response object
     * @param next Restify Next function
     */
    public getWindData(req: Restify.Request, res: Restify.Response, next: Restify.Next) {
        let amountOfReadings = req.query.amount

        this.redisHelper.lrange('reading_wind', 0, !amountOfReadings ? 0 : amountOfReadings -1)
            .then(readings => readings.map(timestamp => {
                console.log(timestamp)
                return this.redisHelper.mget('wind_rpm_' + timestamp).then(values => {
                    return {
                        rpm: Number(values[0]),
                        time: Number(timestamp)
                    }
                })
            }))
            .then(promises => Promise.all(promises))
            .then(v => res.send(v))
            .catch(e => res.send(500, e))
    }

    /**
     * POST /api/weather/wind
     * 
     * Handles creation of windspeed data
     * 
     * @param req Restify Request object
     * @param res Restify Response object
     * @param next Restify Next function
     */
    public postWindspeedData(req: Restify.Request, res: Restify.Response, next: Restify.Next) {
        let postData: Api.WindspeedData = req.body

        if (!postData || !postData.rpm) {
            res.send(400)
            return
        }

        let timestamp = new Date().getTime().toString()

        this.redisHelper.lpush('reading_wind', timestamp)
            .then(() => this.redisHelper.set('wind_rpm_' + timestamp, postData.rpm.toString()))
            .then(() => res.send(201))
            .catch(e => res.send(500, e))
    }
}
