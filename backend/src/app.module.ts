import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationsModule } from './job_application/job_applications.module';
import { HeadersVerificationMiddleware } from './middlewares/headers_verification .middleware';
import { ResumesModule } from './resume/resumes.module';

import { UsersModule } from './user/users.module';
import { UserProfilesModule } from './user_profile/user_profiles.module';
import { VacanciesModule } from './vacancy/vacancies.module';
import { ReferralsModule } from './referral/referrals.module';
import { ReferralCodesModule } from './referral_code/referral_codes.module';
import { ResumeQuestionsModule } from './resume_question/resume_questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // чтобы .env был доступен во всех модулях
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        autoLoadEntities: true,
        //
        synchronize: true, // ❗ только для разработки
      }),
    }),
    UsersModule,
    UserProfilesModule,
    ResumeQuestionsModule,
    ResumesModule,
    ReferralCodesModule,
    ReferralsModule,
    VacanciesModule,
    JobApplicationsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeadersVerificationMiddleware).forRoutes('*');
  }
}
