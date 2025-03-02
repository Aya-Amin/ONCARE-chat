import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAuthService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(require('../../config/serviceAccountKey.json')),
    });
  }

  async verifyToken(token: string): Promise<any> {
    return admin.auth().verifyIdToken(token);
  }
}
