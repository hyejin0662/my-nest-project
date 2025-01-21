import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './dto/post.dto';
import { CreatePostInput } from './dto/create-post.input';

// http://localhost:3000/graphql

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  async findAll() {
    return this.postService.findAll();
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.delete(id);
  }
}
