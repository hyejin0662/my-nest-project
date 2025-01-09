import { ApiProperty } from '@nestjs/swagger';

export class RemoveUserDto {
  @ApiProperty({ description: '사용자 ID', example: 'hyejin', required: true })
  userId: string;

  @ApiProperty({
    description: '현재 비밀번호',
    example: 'currentPassword',
    required: true,
  })
  password: string;
}
