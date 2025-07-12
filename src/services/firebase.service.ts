import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        // Uncomment and set your databaseURL if needed
        // databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com',
      });
    }
  }

  getAdmin() {
    return admin;
  }
}
