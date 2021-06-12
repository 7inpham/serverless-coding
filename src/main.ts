import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';

const serviceAccount = require('../firebase-adminsdk.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'howtokeepitsimple.firebaseio.com',
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
