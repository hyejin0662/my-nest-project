import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '사용자 ID', example: 'hyejin', required: true })
  userId: string;

  @ApiProperty({
    description: '현재 비밀번호',
    example: 'currentPassword',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: '새로운 비밀번호',
    example: 'newPassword',
    required: false,
  })
  newPassword?: string;

  @ApiProperty({
    description: '새로운 사용자 이름',
    example: '김혜진',
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: '새로운 닉네임',
    example: 'hyejin123',
    required: false,
  })
  nickName?: string;
}
