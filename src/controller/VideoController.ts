import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { VideoRepository } from "../data/repositories/VideoRepository";
import { Error } from "../models/Error";
import { videoService } from "../services/videoService";

@autoInjectable()
export class VideoController{

    public constructor (
        private videoRepository: VideoRepository
    ){}

    public async createVideos(req : Request,res : Response) {
        const id = req.params.ytId;

        try {

            const videos = await videoService.getPodcastVideos(id);
            
            videos.forEach(v => this.videoRepository.save(v))

            return res.status(201).json(videos);
        } catch (e) {
            console.log(e);
        }

        const error : Error = { status: 500, errorMessage : `There was an error creating video with id ${id}`};

        return res.status(error.status).json(error);
    }
}