import axios, { AxiosRequestConfig } from "axios";
import { Video } from "../models/Video";
import { youtubeRoutes } from "../shared/config/apiRoutes";

async function getPodcastVideos(ytId:string) : Promise<Video[]>{
    let videos : Video[] = [];
    let publishedBefore = '';
    let videosLoaded : Video[] = [];

    do{
        videos = await getLast50PodcastVideos(ytId,publishedBefore);
        const lastVideo = videos[videos.length - 1];
        publishedBefore = lastVideo ? lastVideo.publishedAt.toString() : '';

        videosLoaded.push(...videos);

        console.log(`Last video loaded from ${ytId}, ${lastVideo.title}`);

    }while(videos.length == 50)

    return videosLoaded;
}

async function getLast50PodcastVideos(ytId:string,publishedBefore:string = '') : Promise<Video[]> {
    const config : AxiosRequestConfig = {
        params: {
            key: process.env.API_KEY_YOUTUBE,
            part:'snippet',
            channelId:ytId,
            maxResults:50,
            order:'date',
            type:'video',
            publishedBefore:publishedBefore == '' ? null : publishedBefore
        }
    }

    const result : any = (await axios.get(youtubeRoutes.search,config)).data;

    const videos : Video[] = result.items.map((v:any) => {
        return {
            ytId: v.id.videoId,
            podcastId: ytId,
            title: v.snippet.title,
            publishedAt: v.snippet.publishedAt,
            description: v.snippet.description,
            thumbnail_url: v.snippet.thumbnails.high.url,
        }
    });

    return videos;
}


export const videoService = {
    getPodcastVideos : getPodcastVideos
}