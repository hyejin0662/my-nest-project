import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Like } from '../../like/dto/like.dto';
import { User } from '../../users/dto/user.dto';
import { Comment} from '../../comment/dto/comment.dto';

// import { Like, User } from '@prisma/client';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  userId: string;

  @Field()
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [Like], { nullable: true })
  likes?: Like[];
}
