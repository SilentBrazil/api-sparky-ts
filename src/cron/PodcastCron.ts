import axios from "axios";
import { youtubeRoutes } from "../config/ApiRoutes";
import { Podcasts } from "../config/Podcasts";
import { PodcastController } from "../controller/PodcastController";
import FirebaseConnect from "../data/connection/FirebaseConnection";
import { PodcastRepository } from "../data/repositories/PodcastRepository";
import { Podcast } from "../models/Podcast";

const db = new FirebaseConnect().initialize();
const repository = new PodcastRepository(db); 

export async function createPodcasts() {
    for (const p in Podcasts) {
        const id = Podcasts[p];

        try {

            const result : any = (await axios.get(
                youtubeRoutes.channels,
                {
                    params: {
                        key: process.env.API_KEY_YOUTUBE,
                        part: 'snippet, statistics',
                        id: id
                    }
                }
            ))

            const channel = result.data.items[0];

            const e : Podcast = {
                ytId : channel.id,
                name : channel.snippet.title,
                icon_url : channel.snippet.thumbnails.default.url,
                subscribers : channel.statistics.subscriberCount,
                hosts_instagrams : ['',''],
                views : channel.statistics.viewCount
            }

            console.log(e);

            console.log(`Creating podcast ${p} with id ${id}`)

            await repository.save(e);

            console.log(`Podcast ${p} successfuly created!`)

            console.log("=================================\n")
        } catch (e) {
            console.log(e);
            console.log(`Failed to create ${p} with id ${id}`);
            break;
        }
    }
}