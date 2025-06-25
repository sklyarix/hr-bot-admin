import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';
import { UserProfileEntity } from './user_profile.entity';
import { UserProfilesController } from './user_profiles.controller';
import { UserProfilesService } from './user_profiles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity]), UsersModule],
  providers: [UserProfilesService],
  controllers: [UserProfilesController],
  exports: [UserProfilesService],
})
export class UserProfilesModule {}
