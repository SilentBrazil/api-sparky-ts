import { DocumentData } from 'firebase-admin/firestore'

interface ICreateChannel {
  name: string,
  icon_url: string,
  subscribe: string,
  views: string
}

interface IChannelRepository {
  createChannel(data: ICreateChannel): Promise<any>
}

class ChannelRepository implements IChannelRepository {
  private db: DocumentData = null

  constructor(db) {
    this.db = db.collection('podcast').doc()
  }

  async createChannel(data: ICreateChannel) {
    return this.db.create(data)
  }

}

export { ChannelRepository, IChannelRepository }