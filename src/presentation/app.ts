import axios from 'axios'
import express from 'express'
import helmet from 'helmet'
import ChannelController from '../controller/ChannelController'
import Connect from '../data/connection/connect'
import { ChannelRepository } from '../data/repositories/ChannelRepository'
import { createFlow } from './routes'


const app = express()

const connect = new Connect()
const channelRepository = new ChannelRepository(connect.initialize())
const channelController = new ChannelController(channelRepository)


app.use(helmet())
app.post('/flowpodcast', createFlow(channelController))

app.get('/kritike', (req, res) => { })
app.get('/prosa', (req, res) => { })
app.get('/ciencia', (req, res) => { })
app.get('/sport', (req, res) => { })
app.get('/cometa', (req, res) => { })

app.listen(3000, () => {
  console.log('🚀 Listening on port 3000')
})

export default app