import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { PodcastRepository } from "../data/repositories/PodcastRepository";
import { VideoRepository } from "../data/repositories/VideoRepository";
import { Error } from "../models/Error";
import { Video } from "../models/Video";
import { podcastService } from "../services/podcastService";

@autoInjectable()
export class PodcastController{

    public constructor (
        private podcastRepository: PodcastRepository,
        private videoRepository : VideoRepository
    ){}

    public async getPodcast(req: Request,res: Response) {
        try{
            const ids : string[] = (<any>req.query.id)?.split(",");

            const podcasts = ids ? await this.podcastRepository.get(ids) : await this.podcastRepository.get([]);

            if(podcasts.length == 0){
                const error : Error = { status : 404, errorMessage: 'Podcast(s) not found'};
                return res.status(error.status).json(error);
            }

            const podcastPromises = podcasts.map(async (p) => {
                let videos : Video[];
                if (podcasts.length == 1)
                    videos = await this.videoRepository.get(p.ytId);
                else
                    videos = await this.videoRepository.get(p.ytId, 10);

                return { ...p, videos: videos };
            });

            const result = await Promise.all(podcastPromises);

            return res.status(200).json(result);
        }catch(e){
            console.log(e);
        }

        const error : Error = { status: 500, errorMessage : `There was an error while fetching your data`};

        return res.status(error.status).json(error);
    }

    public async createPodcast(req : Request,res : Response) {
        const id = req.params.ytId;

        try {
            const podcast = await podcastService.getPodcast(id);
            
            await this.podcastRepository.save(podcast);

            return res.status(201).json(podcast);
        } catch (e) {
            console.log(e);
        }

        const error : Error = { status: 500, errorMessage : `There was an error creating podcast with id ${id}`};

        return res.status(error.status).json(error);
    }
}
