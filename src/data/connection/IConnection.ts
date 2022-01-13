import { Firestore } from "firebase-admin/firestore";

export interface IConnection {
    connect() : Firestore;
}