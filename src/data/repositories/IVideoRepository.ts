import { Video } from "../../models/Video";
import { IRepository } from "./IRepository";

export interface IVideoRespository extends IRepository<Video>{
    lastPodcastVideo(podcastId:string):Promise<Video>
}