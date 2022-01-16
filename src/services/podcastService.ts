import axios, { AxiosRequestConfig } from "axios";
import { Podcast } from "../models/Podcast";
import { Video } from "../models/Video";
import { youtubeRoutes } from "../shared/config/apiRoutes";

async function getPodcast(id: string): Promise<Podcast> {
    console.log("Youtube api key ",process.env.API_KEY_YOUTUBE);

    const config: AxiosRequestConfig = {
        params: {
            key: process.env.API_KEY_YOUTUBE,
            part: 'snippet, statistics',
            id: id
        }
    }

    const channel: any = (<any>await axios.get(youtubeRoutes.channels,config)).data.items[0];

    const podcast: Podcast = {
        ytId: channel.id,
        name: channel.snippet.title,
        icon_url: channel.snippet.thumbnails.high.url,
        subscribers: +channel.statistics.subscriberCount,
        views : +channel.statistics.viewCount,
        host : []
    }

    console.log("Fetched podcast ",podcast);

    return podcast;
}

export const podcastService = {
    getPodcast : getPodcast
}