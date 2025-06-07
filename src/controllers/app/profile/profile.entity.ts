import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname?: string;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
  email: string;

  @ApiProperty()
  phone?: string;
  @ApiProperty()
  birthdate?: Date | string;
  @ApiProperty()
  document?: string;
  @ApiProperty()
  new_password?: string;
  @ApiProperty()
  level_id?: number;
  @ApiProperty()
  address?: string;

  photo?: any;
}
