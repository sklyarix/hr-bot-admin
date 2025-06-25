import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralPayoutEntity } from './referral_payout.entity';
import { ReferralPayoutsController } from './referral_payouts.controller';
import { ReferralPayoutsService } from './referral_payouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferralPayoutEntity])],
  providers: [ReferralPayoutsService],
  controllers: [ReferralPayoutsController],
  exports: [ReferralPayoutsService],
})
export class ReferralPayoutsModule {}
