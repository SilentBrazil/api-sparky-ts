import { Firestore, getFirestore } from 'firebase-admin/firestore'
import admin, { ServiceAccount } from 'firebase-admin'
import { IConnection } from './IConnection'
import privateKey from '../../../private_key.json'
import { singleton } from 'tsyringe';

@singleton()
export class FirebaseConnection implements IConnection{

  private database : Firestore;

  constructor(){
    const app = admin.initializeApp({
      credential: admin.credential.cert(privateKey as ServiceAccount)
    })
    this.database = getFirestore(app);
  }

  public connect() : Firestore{
    return this.database;
  }
}