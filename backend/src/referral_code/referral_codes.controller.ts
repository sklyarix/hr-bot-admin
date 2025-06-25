import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import type { UserDto } from '../user/dto/user.dto';
import {
  ReferralCodeFullDto,
  UserIdReferralCodeDto,
} from './dto/referral_code.dto';
import { ReferralCodeEntity } from './referral_codes.entity';
import { ReferralCodesService } from './referral_codes.service';

// TODO прописать TS полностью

@Controller('referral_codes')
export class ReferralCodesController {
  constructor(private readonly referralCodeService: ReferralCodesService) {}

  @Post()
  async create(
    @Body() dto: UserIdReferralCodeDto,
  ): Promise<ReferralCodeFullDto | Error> {
    return this.referralCodeService.create(dto.userId);
  }

  @Get(':code')
  async getUserByCode(@Param('code') code: string): Promise<UserDto | null> {
    return this.referralCodeService.findUserByCode(code);
  }
  @Get('by-user/:userId')
  async isRefCode(
    @Param('userId') userId: number,
  ): Promise<ReferralCodeEntity | null> {
    return this.referralCodeService.findCodeByUserId(userId);
  }
}
