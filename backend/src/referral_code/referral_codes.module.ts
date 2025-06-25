import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';

import { ReferralCodesController } from './referral_codes.controller';
import { ReferralCodeEntity } from './referral_codes.entity';
import { ReferralCodesService } from './referral_codes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferralCodeEntity]), UsersModule],
  providers: [ReferralCodesService],
  controllers: [ReferralCodesController],
  exports: [ReferralCodesService],
})
export class ReferralCodesModule {}
