import { NestFactory } from '@nestjs/core';
//import admin from 'firebase-admin';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const serviceAccount = './prodshopFirebaseAccess.json';

  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  // });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
