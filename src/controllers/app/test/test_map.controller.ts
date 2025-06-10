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
import { SetEvents, SetFriends } from './test_map.entity';
import { AppTestMapService } from './test_map.service';
import { TestingInterceptor } from 'src/interceptors';

@ApiTags('App - Test Map')
@Controller('api/app/test/map')
@UseInterceptors(TestingInterceptor)
export class AppTestMapController {
  constructor(private readonly mapService: AppTestMapService) {}

  @Post('/setEvents')
  async setEvents(@Body() request: any, @Res() response: Response) {
    try {
      const places = await this.mapService.setEvents(request);

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

  @Post('/setFriends')
  async setFriends(@Body() request: [], @Res() response: Response) {
    try {
      const friends = await this.mapService.setFriends(request);

      if (!friends)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        friends,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
}
