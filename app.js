import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import https from 'https'
import env from './config/environment'
import winstonLogger from './config/winston'
import morgan from 'morgan'
import cors from'cors'

import organizationsRoute from './routes/organizations_route'

const serverRoot = '/taskcause-app-service/api/v1/'
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('combined', { stream: winstonLogger.stream }))
app.use(serverRoot, organizationsRoute)

http.createServer(app).listen(env.server().port)
console.log(`Running on ${env.server().environment} server`)
console.log(`Started HTTP server on PORT ${env.server().port}`)

