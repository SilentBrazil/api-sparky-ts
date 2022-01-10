import { CollectionGroup, DocumentData } from "firebase-admin/firestore";
import { collections } from "../../config/Collections";
import { Podcast } from "../../models/Podcast";
import { Connection } from "../connection/Connection";
import { Repository } from "./Repository";

export class PodcastRepository implements Repository<Podcast>{

    private db : any;

    public constructor(db){
        this.db = db.collection(collections.podcast);
    }

    async save(e: Podcast) : Promise<Podcast> {
        return this.db.add(e);
    }

    get(id: string): Promise<Podcast> | Promise<Podcast[]> {
        throw new Error("Method not implemented.");
    }

}