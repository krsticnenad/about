import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './config/config.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  if(!configService.isProduction()) {

    const swaggerDocument = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle(`${configService.getAppName()} API`)
      .setDescription('')
      .build()
    );

    SwaggerModule.setup('docs', app, swaggerDocument);

  }

  await app.listen(configService.getPort());
}

bootstrap();
