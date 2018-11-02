import * as Restify from "restify"
import { Api } from "../../types"
import { RedisHelper } from "../helpers/redisHelper";
import { DataHelper } from "../helpers/dataHelper";

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

        this.redisHelper.lrange('reading_atmosphere', 0, !amountOfReadings ? 0 : amountOfReadings - 1)
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

        if (!postData || !postData.humidity || !postData.temperature || !postData.heatIndex) {
            res.send(400)
            return
        }

        let timeStamp = new Date().getTime().toString()

        this.redisHelper.lpush('reading_atmosphere', timeStamp)
            .then(_ => this.redisHelper.set('hum_' + timeStamp, postData.humidity.toString()))
            .then(_ => this.redisHelper.set('temp_' + timeStamp, postData.temperature.toString()))
            .then(_ => this.redisHelper.set('heat_' + timeStamp, postData.heatIndex.toString()))
            .then(_ => this.redisHelper.lrange('reading_atmosphere', 287, -1)
                .then(readings => {
                    readings.forEach(timestamp => {
                        this.redisHelper.del('temp_' + timestamp)
                        this.redisHelper.del('hum_' + timestamp),
                            this.redisHelper.del('heat_' + timestamp)
                    })
                })
            )
            // Based on 12 readings per hour and storage for one day
            .then(_ => this.redisHelper.ltrim('reading', 0, 287))
            .then(_ => res.send(201))
            .catch(e => res.send(500, e))
    }

    /**
     * GET /api/weather/wind
     * 
     * Get he most recent weahter dawindta
     * 
     * @param req Restify Request object
     * @param res Restify Response object
     * @param next Restify Next function
     */
    public getWindData(req: Restify.Request, res: Restify.Response, next: Restify.Next) {
        let amountOfReadings = req.query.amount

        this.redisHelper.lrange('reading_wind', 0, !amountOfReadings ? 0 : amountOfReadings - 1)
            .then(readings => readings.map(timestamp => {
                return this.redisHelper.mget('wind_speed_' + timestamp).then(values => {
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
     * Handles creation of windspeed data.
     * The body of this endpoint is a array numbers that represent the time between the start of
     * the readings to a complete rotations
     * 
     * @param req Restify Request object
     * @param res Restify Response object
     * @param next Restify Next function
     */
    public postWindspeedData(req: Restify.Request, res: Restify.Response, next: Restify.Next) {
        let postData: Api.WindspeedData = req.body

        if (!postData || !postData.readings) {
            res.send(400)
            return
        }
        
        let differences = new DataHelper().removeOutliers(postData.readings).reduce((res, curr, i) => {
            i < 1 ? res.push(curr) : res.push(curr - postData.readings[i - 1]);
            return res;
        }, [])

        let average = differences.reduce((sum, curr) => sum + curr, 0) / differences.length
        let timestamp = new Date().getTime().toString()

        this.redisHelper.lpush('reading_wind', timestamp)
            .then(() => this.redisHelper.set('wind_speed_' + timestamp, average.toString()))
            .then(() => res.send(201))
            .catch(e => res.send(500, e))
    }
}
