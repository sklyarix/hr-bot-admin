import { Controller } from '@nestjs/common';
import type { ReferralPayoutsService } from './referral_payouts.service';

@Controller('referral_payouts')
export class ReferralPayoutsController {
  constructor(
    private readonly referralPayoutsService: ReferralPayoutsService,
  ) {}
}
