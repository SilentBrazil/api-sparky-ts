
interface ICreateDTO {
  name: string,
  icon_url: string,
  subscribe: string,
  views: string,
  hosts_instagrams: Array<[]>
}

interface IChannelController {
  create(data: ICreateDTO): Promise<any>
  list(name: string): Promise<any>
  update(data: any): Promise<any>
  delete(data: any): Promise<any>
}

export { ICreateDTO, IChannelController }