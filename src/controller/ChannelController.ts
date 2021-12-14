import { IChannelRepository } from '../data/repositories/ChannelRepository';
import { IChannelController, ICreateDTO } from './interface/IChannelController'

export default class ChannelController implements IChannelController {
  private channelRepository: IChannelRepository

  constructor(channelRepository: IChannelRepository) {
    this.channelRepository = channelRepository
  }

  async create(data: ICreateDTO): Promise<any> {
    const channel = await this.channelRepository.createChannel(data)

    return channel
  }
  list(name: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

}