import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../sns.platform.enum';
export class RemoveSnsDto {
  @ApiProperty({
    description: '사용자의 고유 ID',
    example: 'hyejin123',
    required: true,
  })
  userId: string;

  @ApiProperty({
    description: '사용자의 비밀번호',
    example: 'password123',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: '삭제할 SNS 데이터의 고유 ID',
    example: 1,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: '삭제할 SNS 플랫폼',
    enum: Platform,
    example: Platform.FACEBOOK,
  })
  platform: Platform;
}
