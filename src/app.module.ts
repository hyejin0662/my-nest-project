import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SnsModule } from './sns/sns.module';

@Module({
  imports: [PrismaModule, UsersModule, SnsModule],
})
export class AppModule {}
