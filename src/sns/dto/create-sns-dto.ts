import { ApiProperty } from '@nestjs/swagger';

export class CreateSnsDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number; // userId를 number로 설정
  @ApiProperty({ description: 'SNS Platform', example: 'Twitter' })
  platform: string;
  @ApiProperty({ description: 'Account Name', example: '@user' })
  accountName: string;
  @ApiProperty({
    description: 'Profile URL',
    example: 'https://twitter.com/user',
  })
  url: string;
}
