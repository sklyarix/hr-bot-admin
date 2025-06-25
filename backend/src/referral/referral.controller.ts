import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateReferralDto } from './dto/referral.dto';
import { ReferralEntity } from './referral.entity';

import { ReferralsService } from './referrals.service';

// TODO прописать TS полностью

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Post()
  async create(@Body() dto: CreateReferralDto): Promise<ReferralEntity | null> {
    return this.referralsService.create(dto);
  }

  /*
    GET
    /referrals/user/:userId
    Получить всех рефералов пользователя
  */
  @Get('user/:userId')
  async getAllUserReferrals(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ReferralEntity[]> {
    return this.referralsService.getAllUserReferrals(userId);
  }
}

/*
 @Get()
  async getUserByCode(@Param('referral_code') referral_code: string) {
    return this.referralsService.getUserByCode(referral_code);
  }
 */
