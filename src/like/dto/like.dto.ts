import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../post/dto/post.dto';
import { User } from '../../users/dto/user.dto';



@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  postId: number;

  @Field()
  userId: string;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  user: User;
}
