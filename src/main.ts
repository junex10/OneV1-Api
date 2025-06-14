import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as moment from 'moment';
import {
  ValidationPipe,
  ValidationError,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Constants, HttpExceptionFilter } from 'src/utils';
import * as bodyParser from 'body-parser';

Date.prototype.toJSON = function () {
  return moment(this).format('YYYY-MM-DD HH:mm:ss');
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle(Constants.COMPANY_INFORMATION.NAME)
    .setDescription(Constants.COMPANY_INFORMATION.DESCRIPTION)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException({
          error: Object.values(errors[0].constraints)[0],
        });
      },
    }),
  );
  app.useGlobalFilters(HttpExceptionFilter);
  await app.listen(process.env.PORT);
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}
bootstrap();
