import { collection, query } from "@firebase/firestore";
import { CollectionGroup, CollectionReference, DocumentData, Firestore, QuerySnapshot } from "firebase-admin/firestore";
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
        this.collection.doc(e.ytId).set(e);
        return e;
    }

    async get(ytId: string[]): Promise<Podcast[]> {
        let podcast : Podcast[] = [];

        const result = ytId.length == 0
            ? await this.collection.get()
            : await this.collection.where('ytId','in',ytId).get();

        result.forEach((e) => podcast.push(<Podcast>e.data()));

        return podcast;
    }

}