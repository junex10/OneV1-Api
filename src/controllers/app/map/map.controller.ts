import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  UseInterceptors,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Coordinates, Route } from './map.entity';
import { AppMapService } from './map.service';
import { AppInterceptor } from 'src/interceptors';

@ApiTags('App - Map')
@Controller('api/app/map')
@UseInterceptors(AppInterceptor)
export class AppMapController {
  constructor(private readonly mapService: AppMapService) {}
  @Post('/placesNearby')
  async placesNearby(@Body() request: Coordinates, @Res() response: Response) {
    try {
      const places = await this.mapService.getPlacesNearby(request);

      if (!places)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        places,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }

  @Post('/route')
  async route(@Body() request: Route, @Res() response: Response) {
    try {
      const places = await this.mapService.getRouteDirection(request);

      if (!places)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        places,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
}
