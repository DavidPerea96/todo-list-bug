import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT ?? 3000);

    Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
