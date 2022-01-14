import { CollectionReference } from "firebase-admin/firestore";
import { autoInjectable } from "tsyringe";
import { Video } from "../../models/Video";
import { collections } from "../../shared/config/collections";
import { FirebaseConnection } from "../connection/FirebaseConnection";
import { IRepository } from "./IRepository";

@autoInjectable()
export class VideoRepository implements IRepository<Video>{

    private collection : CollectionReference;

    public constructor(
        db: FirebaseConnection){
        this.collection = db.connect().collection(collections.video);
    }

    async update(e: Video): Promise<Video> {
        await this.collection.doc(e.ytId).update({...e}); 
        return e;   
    }

    async save(e: Video) : Promise<Video> {
        this.collection.doc(e.ytId).set(e);
        return e;
    }

    async get(ytId:string,limit:number): Promise<Video[]> {
        let video : Video[] = [];

        const result = await this.collection
            .where('podcastId','==',ytId)
            .orderBy('publishedAt','desc')
            .limit(limit)
            .get()

        result.forEach((e) => video.push(<Video>e.data()));

        return video;
    }

}