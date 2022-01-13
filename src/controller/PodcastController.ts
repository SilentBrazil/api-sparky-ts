import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { PodcastRepository } from "../data/repositories/PodcastRepository";
import { Error } from "../models/Error";
import { Podcast } from "../models/Podcast";
import { podcastService } from "../services/podcastService";

@autoInjectable()
export class PodcastController{

    public constructor (
        public repository: PodcastRepository
    ){}

    public async getPodcast(req: Request,res: Response) {
        try{
            const ids : string[] = (<any>req.query.id)?.split(",");

            const podcasts = ids ? await this.repository.get(ids) : await this.repository.get([]);

            if(podcasts.length == 0){
                const error : Error = { status : 404, errorMessage: 'Podcast(s) not found'};
                return res.status(error.status).json(error);
            }

            return res.status(200).json(podcasts);
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

            await this.repository.save(podcast);

            return res.status(201).json(podcast);
        } catch (e) {
            console.log(e);
        }

        const error : Error = { status: 500, errorMessage : `There was an error creating podcast with id ${id}`};

        return res.status(error.status).json(error);
    }
}
