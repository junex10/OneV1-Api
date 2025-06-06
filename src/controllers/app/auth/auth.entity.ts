import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginParams {
  @ApiProperty({ required: true })
  @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
  username: string;

  @ApiProperty({ required: true })
  password: string;
}
export class RegisterParams {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  lastname?: string;

  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: false })
  @IsNotEmpty({ message: 'Email field is required' })
  @IsEmail({}, { message: 'Invalid Email' })
  @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({ required: false })
  phone: string;

  @ApiProperty({ required: false })
  @IsNotEmpty({ message: 'El campo contraseña es requerido' })
  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
  password: string;

  @ApiProperty({ required: false })
  password_confirmation: string;

  @ApiProperty()
  level_id?: number;

  @ApiProperty()
  verified?: number;
}

export class RecoverParams {
  @ApiProperty({ required: true })
  @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
  email: string;
}

export class CheckCode {
  @ApiProperty({ required: true })
  @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
  email: string;
  @ApiProperty({ required: true })
  user_id: number;
  @ApiProperty({ required: true })
  code: string;
}

export class CheckCodeParams {
  @ApiProperty({ required: true })
  code: string;
}

export class ResetParams {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'The new password field is required' })
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ required: true })
  password_confirmation: string;

  @ApiProperty({ required: true })
  user_id: number;
}
export class VerifyUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'The code is required' })
  code: number;
}
export class VerifyNewRegisterDTO {
  @ApiProperty({ required: false })
  username: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  phone: number;
  @ApiProperty({ required: false })
  getUser: boolean;
}
export class VerifyPhoneDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'The phone is required' })
  phone: string;
}
export class PermissionDTO {
  @ApiProperty({ required: true })
  token: string;

  @ApiProperty({ required: true })
  code: string;
}
export class VerifyEmailDTO {
  @ApiProperty({ required: true })
  email: string;
}
export class PagesDTO {
  @ApiProperty()
  pages: number;
}
