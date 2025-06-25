import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';
import { ReferralsController } from './referral.controller';
import { ReferralEntity } from './referral.entity';
import { ReferralsService } from './referrals.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferralEntity]), UsersModule],
  providers: [ReferralsService],
  controllers: [ReferralsController],
  exports: [ReferralsService],
})
export class ReferralsModule {}
