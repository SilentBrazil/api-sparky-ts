import express from 'express'
import helmet from 'helmet'
import ChannelController from '../controller/ChannelController'
import { createPodcasts } from '../cron/PodcastCron'
import FirebaseConnection from '../data/connection/FirebaseConnection'
import Connect from '../data/connection/FirebaseConnection'
import { ChannelRepository } from '../data/repositories/ChannelRepository'
import { PodcastRoutes } from './routes/PodcastRoutes'


let app = express()

//Firebase connection
//const database = new FirebaseConnection().initialize();
//const channelRepository = new ChannelRepository(database)
//const channelController = new ChannelController(channelRepository)

app.use(helmet())
//app.post('/flowpodcast', createFlow(channelController))

//app.use("/podcast",PodcastRoutes);

app.listen(3000, () => console.log('\n\n== 🚀 Listening on port 3000 ==\n\n'))

//createPodcasts();

export default app