import { getFirestore } from 'firebase-admin/firestore'
import admin, { ServiceAccount } from 'firebase-admin'

import privateKey from '../../../private_key.json'


class Connect {
  initialize() {
    const app = admin.initializeApp({
      credential: admin.credential.cert(privateKey as ServiceAccount)
    })
    const db = getFirestore(app)

    return db
  }
}

export default Connect