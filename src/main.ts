import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SNS API')
    .setDescription('SNS 연동 서비스를 위한 api문서')
    .setVersion('1.0')
    .addTag('SNS')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // 서버 시작
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
