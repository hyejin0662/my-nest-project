import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '사용자 ID', example: 'hyejin', required: true })
  userId: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '김혜진',
    required: true,
  })
  username: string;

  @ApiProperty({ description: '닉네임', example: 'hyejin123', required: false })
  nickName?: string;

  @ApiProperty({ description: '비밀번호', example: '123456', required: true })
  password: string;
}
