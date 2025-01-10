import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SnsModule } from './sns/sns.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    // GraphQL 설정
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // 자동으로 스키마 파일 생성
      sortSchema: true, // 스키마 정렬
    }),
    PrismaModule,
    UsersModule,
    SnsModule,
  ],
})
export class AppModule {}
