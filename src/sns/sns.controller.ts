import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SnsService } from './sns.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSnsDto } from './dto/create-sns-dto';
import { UpdateSnsDto } from './dto/update-sns-dto';
import { RemoveSnsDto } from './dto/remove-sns-dto';

@ApiTags('SNS')
@Controller('sns')
export class SnsController {
  constructor(private readonly snsService: SnsService) {}
  @Post()
  @ApiOperation({ summary: '새로운 sns 데이터 생성' })
  create(@Body() createSnsDto: CreateSnsDto) {
    return this.snsService.create(createSnsDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 sns 데이터 조회' })
  findAll() {
    return this.snsService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: '특정 sns 데이터 조회' })
  findOne(@Param('userID') userId: string) {
    return this.snsService.findOne(userId);
  }

  @Patch()
  @ApiOperation({ summary: 'SNS 데이터 수정' })
  update(@Body() updateSnsDto: UpdateSnsDto) {
    return this.snsService.update(updateSnsDto);
  }

  @Delete()
  @ApiOperation({ summary: 'SNS 데이터 삭제' })
  remove(removeSnsDto: RemoveSnsDto) {
    return this.snsService.remove(removeSnsDto);
  }
}
