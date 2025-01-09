import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { RemoveUserDto } from './dto/remove-user-dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '새로운 사용자 생성' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 사용자 조회' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: '특정 사용자 조회' })
  @ApiParam({
    name: 'userId',
    description: '조회할 사용자 ID',
    example: 'hyejin',
  })
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch()
  @ApiOperation({ summary: '사용자 정보 수정' })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: '사용자 삭제' })
  remove(@Body() removeUserDto: RemoveUserDto) {
    return this.usersService.remove(removeUserDto);
  }
}
