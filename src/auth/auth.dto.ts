// src/auth/auth.dto.ts

import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  newPassword?: string;
}
