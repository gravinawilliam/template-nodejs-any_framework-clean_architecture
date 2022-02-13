import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppConfig } from '@main/config/app.config';
import { showBanner } from '@main/utils/banner.util';

import { AppModule } from './modules/global/app.module';

export class NestjsFramework {
  public async execute(): Promise<INestApplication> {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    await app.listen(AppConfig.PORT, () => showBanner());
    return app;
  }
}
