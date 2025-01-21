import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../sns.platform.enum';

export class CreateSnsDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  userId: string; // userId를 number로 설정
  @ApiProperty({
    description: 'SNS 플랫폼',
    enum: Platform,
    example: Platform.FACEBOOK,
  })
  platform: Platform;
  @ApiProperty({ description: 'Account Name', example: '@user' })
  accountName: string;
  @ApiProperty({
    description: 'Profile URL',
    example: 'https://twitter.com/user',
  })
  url: string;
}
