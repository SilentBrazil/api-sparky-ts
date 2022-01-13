import axios from "axios";
import { Request, Response } from "express";
import { injectable, inject, autoInjectable } from "tsyringe";
import { PodcastRepository } from "../data/repositories/PodcastRepository";
import { Podcast } from "../models/Podcast";
import { youtubeRoutes } from "../shared/config/apiRoutes";

@autoInjectable()
export class PodcastController{

    public constructor (
        public repository: PodcastRepository
    ){}


    public getPodcast(req: Request,res: Response):void{
       res.send("Hello world!")
    }

    public getPodcastList(req: Request,res: Response):void{
        
    }
    
    public async createPodcast(req : Request,res : Response) {
        const id = req.params.ytId;
        //console.log("Got here",this.repository);

        console.log("Id",id);
        try {
            // const data : any = await axios.get(
            //     youtubeRoutes.channels,
            //     {
            //         params: {
            //             key: process.env.API_KEY_YOUTUBE,
            //             part: 'snippet, statistics',
            //             id: id
            //         }
            //     }
            // )

            // console.log("Data returned ",data.items);

            const response : Podcast = {
                name : "TesteNOVOPODCAST",
                icon_url : "icon",
                subscribers : 1,
                hosts_instagrams : ['',''],
                views : 67,
                ytId: ""
            }

            console.log("Got here",this.repository);
            await this.repository.save(response);
            return res.status(201).json(response);
        } catch (e) {
            console.log("Failed on id ",id);
            console.log("Error :: "+e);
        }
        res.status(400).json("Error");
    }
}
