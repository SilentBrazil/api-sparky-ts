import { Video } from "./Video";

export interface Podcast{
    ytId:string,
    name: string,
    icon_url: string,
    subscribers: number,
    views: number,
    host:Host[],
    videos:Video[]
}

export interface Host{
    name: string,
    instagram: string,
    twitter : string
}