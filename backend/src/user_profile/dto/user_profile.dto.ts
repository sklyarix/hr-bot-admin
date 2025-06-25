import { IsOptional, IsString, IsInt } from 'class-validator';

export class UserProfileDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  city?: string;
}
