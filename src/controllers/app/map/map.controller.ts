import {
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Coordinates, GetEvents, Route } from './map.entity';
import { AppMapService } from './map.service';

@ApiTags('App - Map')
@Controller('api/app/map')
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

  @Post('/getEvents')
  async getEvents(@Body() request: GetEvents, @Res() response: Response) {
    try {
      const places = await this.mapService.getEvents(request);

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
