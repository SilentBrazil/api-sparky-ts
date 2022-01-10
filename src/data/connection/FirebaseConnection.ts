import { getFirestore } from 'firebase-admin/firestore'
import admin, { ServiceAccount } from 'firebase-admin'

import privateKey from '../../../private_key.json'
import { Connection } from './Connection'


class FirebaseConnect implements Connection {
  initialize() {
    const app = admin.initializeApp({
      credential: admin.credential.cert(privateKey as ServiceAccount)
    })
    const db = getFirestore(app)

    return db
  }
}

export default FirebaseConnect