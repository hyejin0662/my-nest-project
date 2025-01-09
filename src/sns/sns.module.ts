import { Module } from '@nestjs/common';
import { SnsController } from './sns.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SnsService } from './sns.service';

@Module({
  controllers: [SnsController],
  providers: [SnsService, PrismaService],
})
export class SnsModule {}
