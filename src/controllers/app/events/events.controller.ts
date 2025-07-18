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
import {
  GetAllMyEventsDTO,
  GetAllPopularEventsDTO,
  GetCommentsDTO,
  GetEventDTO,
  GetEventsByUserDTO,
  GetEventsDTO,
  GetEventsTypeDTO,
  GetPostsDTO,
  GetViewersDTO,
  SetEventDTO,
} from './event.entity';
import { AppEventsService } from './events.service';
import { AppInterceptor } from 'src/interceptors';

@ApiTags('App - Events')
@Controller('api/app/events')
@UseInterceptors(AppInterceptor)
export class AppEventsController {
  constructor(private readonly eventService: AppEventsService) {}

  @Post('/setEvent')
  async setEvent(@Body() request: SetEventDTO, @Res() response: Response) {
    try {
      const places = await this.eventService.setEvent(request);

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
      const places = await this.eventService.getEvents(request);

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
      const place = await this.eventService.getEvent(request);

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
      const places = await this.eventService.getEventsByUser(request);

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

  @Post('/getEventsType')
  async getEventsType(@Res() response: Response) {
    try {
      const items = await this.eventService.getEventsType();

      if (!items)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        items,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
  @Post('/getEventsTypeById')
  async getEventsTypeById(
    @Body() request: GetEventsTypeDTO,
    @Res() response: Response,
  ) {
    try {
      const item = await this.eventService.getEventsTypeById(request);

      if (!item)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        item,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
  @Post('/getAllMyEvents')
  async getAllMyEvents(
    @Body() request: GetAllMyEventsDTO,
    @Res() response: Response,
  ) {
    try {
      const events = await this.eventService.getAllMyEvents(request);

      if (!events)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        events,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }

  @Post('/getAllPopularEvents')
  async getAllPopularEvents(
    @Body() request: GetAllPopularEventsDTO,
    @Res() response: Response,
  ) {
    try {
      const events = await this.eventService.getAllPopularEvents(request);

      if (!events)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        events,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }

  @Post('/getViewers')
  async getViewers(@Body() request: GetViewersDTO, @Res() response: Response) {
    try {
      const viewers = await this.eventService.getViewers(request);

      if (!viewers)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        viewers,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
  @Post('/getComments')
  async getComments(
    @Body() request: GetCommentsDTO,
    @Res() response: Response,
  ) {
    try {
      const comments = await this.eventService.getComments(request);

      if (comments !== 0) {
        if (!comments)
          return response
            .status(HttpStatus.UNPROCESSABLE_ENTITY)
            .json({ error: 'Connection error, please try again' });
      }

      return response.status(HttpStatus.OK).json({
        comments,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
  @Post('/getPosts')
  async getPosts(@Body() request: GetPostsDTO, @Res() response: Response) {
    try {
      const posts = await this.eventService.getPosts(request);

      if (!posts)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'Connection error, please try again' });

      return response.status(HttpStatus.OK).json({
        posts,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
}
