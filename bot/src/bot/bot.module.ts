import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';
import { session } from 'telegraf';
import { ApiModule } from '../api/api.module';
import { BotUpdate } from './bot.update';
import { ContactsModule } from './contacts/contacts.module';
import { FaqModule } from './faq/faq.module';
import { JobApplicationsModule } from './jobApplications/jobApplications.module';
import { ReferralsModule } from './referrals/referrals.module';

import { ServicesModule } from './services/services.module';

import { VacanciesModule } from './vacancies/vacancies.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('BOT_TOKEN') || '',
        middlewares: [session()],
      }),
    }),
    ApiModule,
    ReferralsModule,
    VacanciesModule,
    JobApplicationsModule,
    ServicesModule,
    FaqModule,
    ContactsModule,
  ],
  providers: [BotUpdate],
  controllers: [],
})
export class BotModule {}

/*


 
 */
