import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Coordinates {
  @ApiProperty({ required: true })
  latitude: number;
  @ApiProperty({ required: true })
  longitude: number;
}

export class Route {
  @ApiProperty({ required: true })
  origin: Coordinates;
  @ApiProperty({ required: true })
  destination: Coordinates;
  @ApiProperty({ required: false })
  waypoint: Coordinates;
}

export class GetEvents {
  @ApiProperty({ required: true })
  coordinates: Coordinates;
}
