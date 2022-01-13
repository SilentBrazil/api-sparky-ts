import { container } from 'tsyringe'
import { Podcast } from '../models/Podcast'

import { PodcastRepository } from '../data/repositories/PodcastRepository'
import { IRepository } from '../data/repositories/IRepository'
import { FirebaseConnection } from '../data/connection/FirebaseConnection'
import { IConnection } from '../data/connection/IConnection'

container.registerSingleton<IConnection>('IConnection',FirebaseConnection);