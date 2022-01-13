import axios, { AxiosRequestConfig } from "axios";
import { Podcast } from "../models/Podcast";
import { Video } from "../models/Video";
import { youtubeRoutes } from "../shared/config/apiRoutes";

async function getPodcast(id: string): Promise<Podcast> {
    const config: AxiosRequestConfig = {
        params: {
            key: process.env.API_KEY_YOUTUBE,
            part: 'snippet, statistics',
            id: id
        }
    }

    const channel: any = (<any>await axios.get(youtubeRoutes.channels,config)).data.items[0];

    const videos = await getPodcastVideos(id);

    const podcast: Podcast = {
        ytId: channel.id,
        name: channel.snippet.title,
        icon_url: channel.snippet.thumbnails.high.url,
        subscribers: channel.statistics.subscriberCount,
        views : channel.statistics.viewCount,
        host : [],
        videos : videos
    }

    return podcast;
}

async function getPodcastVideos(ytId:string) : Promise<Video[]> {
    const config : AxiosRequestConfig = {
        params: {
            key: process.env.API_KEY_YOUTUBE,
            part:'snippet',
            channelId:ytId,
            maxResults:50,
            order:'date',
            type:'video',
        }
    }

    const result : any = (await axios.get(youtubeRoutes.search,config)).data;

    const videos : Video[] = result.items.map((v:any) => {
        return {
            ytId: v.id.videoId,
            channelId: ytId,
            title: v.snippet.title,
            publishedAt: v.snippet.publishedAt,
            description: v.snippet.description,
            thumbnail_url: v.snippet.thumbnails.high.url,
        }
    });

    return videos;
}

export const podcastService = {
    getPodcast : getPodcast,
    getPodcastVideos : getPodcastVideos
}