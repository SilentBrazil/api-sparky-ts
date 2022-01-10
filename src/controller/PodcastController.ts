import axios from "axios";
import { youtubeRoutes } from "../config/ApiRoutes";
import FirebaseConnect from "../data/connection/FirebaseConnection";
import { ChannelRepository } from "../data/repositories/ChannelRepository";
import { PodcastRepository } from "../data/repositories/PodcastRepository";
import { Podcast } from "../models/Podcast";

const db = new FirebaseConnect().initialize();
const repository = new PodcastRepository(db); 

export const PodcastController = {

    async createPodcast(req,res) {
        const id = req.params.ytId;
        console.log("Id",id);
        try {
            const data : any = await axios.get(
                youtubeRoutes.channels,
                {
                    params: {
                        key: process.env.API_KEY_YOUTUBE,
                        part: 'snippet, statistics',
                        id: id
                    }
                }
            )

            console.log("Data returned ",data.items);
            /*
            const response : Podcast = {
                name: data.items[0].snippet.title,
                icon_url: data.items[0].snippet.thumbnails.default.url,
                subscribers: data.items[0].statistics.subscriberCount,
                views: data.items[0].statistics.viewCount,
                hosts_instagrams: ['', '']
            }*/

            const response : Podcast = {
                name : "Teste",
                icon_url : "icon",
                subscribers : 1,
                hosts_instagrams : ['',''],
                views : 67
            }

            console.log("Got here");
            await repository.save(response);
            res.status(201).json(response)
        } catch (e) {
            console.log("Failed on id ",id);
            console.log("Error :: "+e);
        }
        res.status(400).json("Error");
    }
}