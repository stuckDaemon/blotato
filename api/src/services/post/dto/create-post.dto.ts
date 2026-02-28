import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  declare userId: string;

  @IsString()
  @IsNotEmpty()
  declare platform: string;

  @IsString()
  @IsNotEmpty()
  declare content: string;

  // ISO string from client (e.g. 2026-03-01T09:00:00Z)
  @IsDateString()
  declare desiredTime: string;
}
