import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { ReferralPayoutEntity } from './referral_payout.entity';

@Injectable()
export class ReferralPayoutsService {
  constructor(
    @InjectRepository(ReferralPayoutEntity)
    private readonly referralPayoutRepository: Repository<ReferralPayoutEntity>,
  ) {}
}
