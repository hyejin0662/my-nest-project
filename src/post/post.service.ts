import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: createPostInput,
    });
  }

  // async findAll() {
  //   return this.prisma.post.findMany();
  // }

  async findAll() {
    return this.prisma.post.findMany({
      include: {
        user: true, // 게시물 작성자
        comments: true, // 게시물 댓글
        likes: true, // 게시물 좋아요
      },
    });
  }


  // async findOne(id: number) {
  //   const post = await this.prisma.post.findUnique({
  //     where: { id },
  //   });
  //   if (!post) {
  //     throw new NotFoundException(`Post with ID ${id} not found`);
  //   }
  //   return post;
  // }
  async findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        comments: true,
        likes: true,
      },
    });
  }
  async delete(id: number) {
    await this.findOne(id); // 존재 여부 확인
    await this.prisma.post.delete({
      where: { id },
    });
    return true;
  }
}
