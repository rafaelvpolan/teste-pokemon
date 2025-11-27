import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
console.log('ENNVVVLLL>>>',process.env);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
