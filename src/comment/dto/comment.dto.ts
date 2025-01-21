import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/dto/post.dto';
import { User } from 'src/users/dto/user.dto';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  postId: number;

  @Field()
  userId: string;

  @Field()
  content: string;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  user: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
