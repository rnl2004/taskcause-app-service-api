const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const env = require('./config/environment')
const winstonLogger = require('./config/winston')
const morgan = require( 'morgan')
const cors = require('cors')

const organizationsRoute = require('./routes/organizations_route')

const serverRoot = '/taskcause-app-service/api/v1/'
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('combined', { stream: winstonLogger.stream }))
app.use(serverRoot, organizationsRoute)

http.createServer(app).listen(env.server().port, env.server().hostname)
console.log(`Started running on HTTP server ${env.server().hostname} PORT ${env.server().port}`)

