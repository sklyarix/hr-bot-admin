import { Module } from '@nestjs/common';
import { ApiModule } from '../../api/api.module';
import { ReferralsAction } from './referrals.action';
import { ReferralsHears } from './referrals.hears';

@Module({
  imports: [ApiModule],
  providers: [ReferralsHears, ReferralsAction],
})
export class ReferralsModule {}
