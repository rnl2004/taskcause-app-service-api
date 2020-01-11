import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import https from 'https'
import env from './commons/environment'
import winstonLogger from './config/winston'
import morgan from 'morgan'
import cors from'cors'

import organizationRoute from './routes/organization_route'
import userRoute from './routes/user_route'

const serverRoot = '/taskcause-app-service/api/v1/'
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('combined', { stream: winstonLogger.stream }))

app.use(serverRoot, organizationRoute)
//app.use(serverRoot, userRoute)

http.createServer(app).listen(env.deploymentServer().port)
console.log(`Running on ${env.deploymentServer().environment} server`)
console.log(`Started HTTP server on PORT ${env.deploymentServer().port}`)
