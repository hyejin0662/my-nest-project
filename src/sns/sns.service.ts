import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSnsDto } from './dto/create-sns-dto';
import { UpdateSnsDto } from './dto/update-sns-dto';
import { RemoveSnsDto } from './dto/remove-sns-dto';
import { Platform } from './sns.platform.enum';

@Injectable()
export class SnsService {
  constructor(private readonly prisma: PrismaService) {}

  // sns 데이터 생성
  async create(createSnsDto: CreateSnsDto) {
    const { userId, platform, accountName, url } = createSnsDto;

    // userId가 존재하는지 확인
    const userExists = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException(`user with userID "${userId}" not found`);
    }

    // userId와 platform의 조합이 이미 존재하는지 확인
    const snsExists = await this.prisma.sns.findFirst({
      where: { userId, platform },
    });

    if (snsExists) {
      throw new ConflictException(
        `SNS for platform "${platform}" already exists for userId "${userId}".`,
      );
    }

    return this.prisma.sns.create({
      data: {
        userId,
        platform,
        accountName,
        url,
      },
    });
  }

  async findAll() {
    return this.prisma.sns.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(userId: string, platform: Platform) {
    const sns = await this.prisma.sns.findFirst({
      where: {
        userId,
        platform,
      },
      include: {
        user: true,
      },
    });

    if (!sns) {
      throw new NotFoundException(`sns with id ${userId} not found`);
    }
    return sns;
  }

  async update(updateSnsDto: UpdateSnsDto) {
    const { userId, id, platform, accountName, url } = updateSnsDto;

    // sns 데이터 존재 여부 확인
    const snsExists = await this.prisma.sns.findUnique({
      where: { id, platform },
    });

    if (!snsExists || snsExists.userId !== userId) {
      throw new NotFoundException(
        'sns data with Id ${ id } not found or user not authorized',
      );
    }

    // 새로운 플랫폼으로 변경 시 충돌 확인
    if (platform && platform !== snsExists.platform) {
      const conflict = await this.prisma.sns.findFirst({
        where: { userId, platform },
      });
      if (conflict) {
        throw new ConflictException(
          `SNS for platform "${platform}" already exists for userId "${userId}".`,
        );
      }
    }

    // 데이터 업데이트
    return this.prisma.sns.update({
      where: { id, platform },
      data: {
        platform: platform ?? undefined, // 값이 제공되지 않으면 필드를 무시
        accountName: accountName ?? undefined,
        url: url ?? undefined,
      },
    });
  }

  async remove(removeSnsDto: RemoveSnsDto) {
    const { userId, password, id, platform } = removeSnsDto;

    //비밀번호 검증 로직 (User 테이블에서 비밀번호 확인)
    const user = await this.prisma.user.findUnique({
      where: { userId },
    });

    if (!user || user.password !== password) {
      throw new Error('Invalid user credentials');
    }

    //sns 데이터 삭제
    const sns = await this.prisma.sns.findFirst({
      where: { userId, platform },
    });

    if (!(!sns || sns.userId !== userId)) {
    } else {
      throw new Error(
        'SNS data not found or user does not have permission to delete it',
      );

      return this.prisma.sns.delete({ where: { id, platform } });
    }
  }
}
