import { CollectionReference } from "firebase-admin/firestore";
import { autoInjectable } from "tsyringe";
import { Video } from "../../models/Video";
import { collections } from "../../shared/config/collections";
import { FirebaseConnection } from "../connection/FirebaseConnection";
import { IRepository } from "./IRepository";
import { IVideoRespository } from "./IVideoRepository";

@autoInjectable()
export class VideoRepository implements IVideoRespository{

    private collection : CollectionReference;

    public constructor(
        db: FirebaseConnection){
        this.collection = db.connect().collection(collections.video);
    }

    async lastPodcastVideo(podcastId: string): Promise<Video> {
        const result = await this.collection
            .where('podcastId','==',podcastId)
            .orderBy('publishedAt','desc')
            .limit(1).get();
        return <Video>result.docs[0].data();
    }

    async update(e: Video): Promise<Video> {
        await this.collection.doc(e.ytId).update({...e}); 
        return e;   
    }

    async save(e: Video) : Promise<Video> {
        this.collection.doc(e.ytId).set(e);
        return e;
    }

    async get(podcastId:string,limit?:number): Promise<Video[]> {
        let video : Video[] = [];

        let result;
        if(limit)
            result = await this.collection.where('podcastId','==',podcastId).orderBy('publishedAt','desc').limit(limit).get()
        else
            result = await this.collection.where('podcastId','==',podcastId).orderBy('publishedAt','desc').get();

        result.forEach((e) => video.push(<Video>e.data()));

        return video;
    }

}