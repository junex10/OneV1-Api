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
import {
  GetEventDTO,
  GetEventsByUserDTO,
  GetEventsDTO,
  SetEventDTO,
} from './event.entity';
import { AppEventsService } from './events.service';

@ApiTags('App - Events')
@Controller('api/app/events')
export class AppEventsController {
  constructor(private readonly mapService: AppEventsService) {}

  @Post('/setEvent')
  async setEvent(@Body() request: SetEventDTO, @Res() response: Response) {
    try {
      const places = await this.mapService.setEvent(request);

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
  async getEvents(@Body() request: GetEventsDTO, @Res() response: Response) {
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

  @Post('/getEvent')
  async getEvent(@Body() request: GetEventDTO, @Res() response: Response) {
    try {
      const place = await this.mapService.getEvent(request);

      if (!place)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        place,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }

  @Post('/getEventsByUser')
  async getEventsByUser(
    @Body() request: GetEventsByUserDTO,
    @Res() response: Response,
  ) {
    try {
      const place = await this.mapService.getEventsByUser(request);

      if (!place)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        place,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
}
