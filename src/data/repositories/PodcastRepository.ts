import { CollectionGroup, CollectionReference, DocumentData, Firestore } from "firebase-admin/firestore";
import { autoInjectable, inject, injectable, singleton } from "tsyringe";
import { Podcast } from "../../models/Podcast";
import { collections } from "../../shared/config/collections";
import { FirebaseConnection } from "../connection/FirebaseConnection";
import { IConnection } from "../connection/IConnection";
import { IRepository } from "./IRepository";

@autoInjectable()
export class PodcastRepository implements IRepository<Podcast>{

    private collection : CollectionReference;

    public constructor(
        db: FirebaseConnection){
        this.collection = db.connect().collection(collections.podcast);
    }

    async save(e: Podcast) : Promise<Podcast> {
        this.collection.add(e);
        return e;
    }

    get(id: string): Promise<Podcast> | Promise<Podcast[]> {
        throw new Error("Method not implemented.");
    }

}