import * as Restify from "restify"
import * as Dotenv from "dotenv"
import { WeahterApiController } from "./controllers/WeahterApiController"
import { SignatureMiddleware } from "./middleware/SignatureMiddleware";
import { RedisHelper } from "./helpers/redisHelper";

Dotenv.config()
const server = Restify.createServer({
  name: 'home-station-api',
  version: '1.0.0'
})

// Helpers
const signature = new SignatureMiddleware(process.env.APP_SECRET)
const redisHelper = new RedisHelper(process.env.REDIS_HOST)

// Middleware
server.use(Restify.plugins.acceptParser(server.acceptable))
server.use(Restify.plugins.queryParser())
server.use(Restify.plugins.bodyParser())
server.use((req, res, next) => signature.handleRequest(req, res, next))


// Registration of routes
const weahterApi = new WeahterApiController(redisHelper)

server.get('/', Restify.plugins.serveStatic({
  directory: './wwwroot',
  default: 'index.html'
}));
server.get('/api/weather/atmosphere', (req, res, next) => weahterApi.getAtmosphereData(req, res, next))
server.post('/api/weather/atmosphere', (req, res, next) => weahterApi.postAtmosphereData(req, res, next))
server.get('/api/weather/wind', (req, res, next) => weahterApi.getWindData(req, res, next))
server.post('/api/weather/wind', (req, res, next) => weahterApi.postWindspeedData(req, res, next))

// Start server
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});