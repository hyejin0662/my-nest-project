import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { RemoveUserDto } from './dto/remove-user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { userId: createUserDto.userId },
    });

    if (existingUser) {
      throw new ConflictException(
        `User ID "${createUserDto.userId}" already exists.`,
      );
    }

    return this.prisma.user.create({
      data: {
        userId: createUserDto.userId,
        username: createUserDto.username,
        nickName: createUserDto.nickName ?? null,
        password: createUserDto.password,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        userId: true,
        username: true,
        nickName: true,
        createAt: true,
        updateAt: true,
      },
    });
  }

  async findOne(userId: string, includePassword = false) {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      select: {
        id: true,
        userId: true,
        username: true,
        nickName: true,
        password: includePassword,
        createAt: true,
        updateAt: true,
        sns: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const { userId, password, username, nickName, newPassword } = updateUserDto;

    // 기존 사용자 조회 (비밀번호 포함)
    const existingUser = await this.findOne(userId, true);

    // 비밀번호 검증
    if (existingUser.password !== password) {
      throw new BadRequestException(
        'Invalid password. Cannot update user information.',
      );
    }

    // 새로운 정보로 업데이트
    return this.prisma.user.update({
      where: { userId },
      data: {
        username: username ?? existingUser.username,
        nickName: nickName ?? existingUser.nickName,
        password: newPassword ?? existingUser.password,
      },
    });
  }

  async remove(removeUserDto: RemoveUserDto) {
    const { userId, password } = removeUserDto;

    // 기존 사용자 조회 (비밀번호 포함)
    const existingUser = await this.findOne(userId, true);

    // 비밀번호 검증
    if (existingUser.password !== password) {
      throw new BadRequestException('Invalid password. Cannot delete user.');
    }

    // 사용자 삭제
    return this.prisma.user.delete({
      where: { userId },
    });
  }
}
