import * as Restify from "restify"
import * as Sequelize from "sequelize"
import * as Dotenv from "dotenv"
import { WeahterApiController } from "./controllers/WeahterApiController"

// Import .env config
Dotenv.config()

// Create instances
const server = Restify.createServer({ name: 'home-station-api', version: '1.0.0' })
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


// Middleware
server.use(Restify.plugins.gzipResponse())
server.use(Restify.plugins.acceptParser(server.acceptable))
server.use(Restify.plugins.queryParser())
server.use(Restify.plugins.bodyParser())

// Registration of routes
const weahterApi = new WeahterApiController(sequelize)

server.get('/*', Restify.plugins.serveStatic({
  directory: './wwwroot',
  default: 'index.html'
}));
server.get('/api/weather/atmosphere', (req, res, next) => weahterApi.getAtmosphereData(req, res, next))
server.get('/api/weather/atmosphere/latest', (req, res, next) => weahterApi.getLatestAtmosphereData(req, res, next))
server.post('/api/weather/atmosphere', (req, res, next) => weahterApi.postAtmosphereData(req, res, next))
server.get('/api/weather/wind', (req, res, next) => weahterApi.getWindData(req, res, next))
server.post('/api/weather/wind', (req, res, next) => weahterApi.postWindspeedData(req, res, next))

// Start server
server.listen(process.env.NODE_PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});