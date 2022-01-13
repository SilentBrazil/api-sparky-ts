import 'reflect-metadata'
import './shared/container'
import express from 'express'
import helmet from 'helmet'
import { PodcastRoutes } from './routes/podcast.routes'
let app = express()

app.use(helmet())

app.use("/podcast",PodcastRoutes);

app.listen(3000, () => console.log('\n\n== 🚀 Listening on port 3000 ==\n\n'));

export default app