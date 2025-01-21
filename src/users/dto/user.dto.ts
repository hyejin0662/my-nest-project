import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  userId: string;

  @Field()
  username: string;

  @Field()
  nickName: string;

  @Field()
  password: string;
}
