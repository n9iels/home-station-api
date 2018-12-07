import * as Restify from "restify"
import * as Sequelize from "sequelize"
import Axios from "axios"
import { Api } from "../../types"
import { DataHelper } from "../helpers/dataHelper"
import { Atmosphere } from "../models/atmosphere";
import { Windspeed } from "../models/windspeed";

export class WeahterApiController {

    /**
     * Mysql client
     */
    private sequelize: Sequelize.Sequelize

    constructor(sequelize: Sequelize.Sequelize) {
        this.sequelize = sequelize
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
        let from = new Date(req.query.from)
        let to = new Date(req.query.to)
        let amount = Number(req.query.amount)

        if (!from || !to || isNaN(from.getTime()) || isNaN(to.getTime())) {
            res.send(400)
            return
        }

        new Atmosphere(this.sequelize)
            .getBetween(from, to, !amount || isNaN(amount) ? 300 : amount)
            .then(v => res.send(v))
            .catch(e => next(e))
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
        let postData: Api.AtmosphereAddData = req.body

        if (!postData || !postData.humidity || !postData.temperature || !postData.heatIndex) {
            res.send(400)
            return
        }

        // Get the latest wind data to send it to the central server
        new Windspeed(this.sequelize).getLatest()
            .then(windspeed => new Atmosphere(this.sequelize)
                .create({ ...postData })
                .then(postData => {
                    Axios.post("http://hro-sma.nl/api/weatherupdates", {
                        deviceId: process.env.DEVICE_ID_ATMOS,
                        temperatureC: postData.temperature,
                        humidity: postData.humidity,
                        windspeed: windspeed.average_speed
                    }, { headers: { "X-Device-Id": process.env.DEVICE_ID_ATMOS } })

                    return postData;
                })
                .then(v => res.send(201, v))
                .catch(e => next(e))
            )
    }

    /**
     * GET /api/weather/wind
     * 
     * Get wind-data between a timeframe
     * 
     * @param req Restify Request object
     * @param res Restify Response object
     * @param next Restify Next function
     */
    public getWindData(req: Restify.Request, res: Restify.Response, next: Restify.Next) {
        let from = new Date(req.query.from)
        let to = new Date(req.query.to)

        if (!from || !to || isNaN(from.getTime()) || isNaN(to.getTime())) {
            res.send(400)
            return
        }

        new Windspeed(this.sequelize)
            .getBetween(from, to)
            .then(v => res.send(v))
            .catch(e => next(e))
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
        let postData: Api.WindspeedAddData = req.body

        if (!postData || !postData.readings) {
            res.send(400)
            return
        }

        let postProcessed = postData.readings.filter(v => v != 0);
        let differences = new DataHelper().removeOutliers(postProcessed).reduce((res, curr, i) => {
            i < 1 ? res.push(curr) : res.push(curr - postProcessed[i - 1]);
            return res;
        }, [])

        let average = differences.reduce((sum, curr) => sum + curr, 0) / differences.length
        let bft: number;

        if (isNaN(average)) {
            bft = 0;
        } else if (average <= 170) {
            bft = 24;
        } else if (average > 170 && average <= 190) {
            bft = 17;
        } else if (average > 190 && average <= 300) {
            bft = 8;
        } else {
            bft = 3;
        }

        new Windspeed(this.sequelize)
            .create({ average_speed: bft })
            .then(v => res.send(201, v))
            .catch(e => next(e))
    }
}