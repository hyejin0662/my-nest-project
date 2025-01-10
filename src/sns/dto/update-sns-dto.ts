import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../sns.platform.enum';

export class UpdateSnsDto {
  @ApiProperty({ description: '수정할 SNS 데이터의 고유 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '사용자의 고유 ID', example: 'hyejin123' })
  userId: string;

  @ApiProperty({
    description: 'SNS 플랫폼',
    enum: Platform,
    example: Platform.FACEBOOK,
  })
  platform: Platform;

  @ApiProperty({
    description: 'SNS 계정 이름',
    example: '@hyejin123',
    required: false,
  })
  accountName?: string;

  @ApiProperty({
    description: 'SNS 프로필 URL',
    example: 'https://twitter.com/hyejin123',
    required: false,
  })
  url?: string;
}
