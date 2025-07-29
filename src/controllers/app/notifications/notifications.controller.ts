import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Res,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';

import { Response } from 'express';
import { NotificationsService } from './notifications.service';
import { NotificationDTO } from './notifications.entity';
import { ApiTags } from '@nestjs/swagger';
import { AppInterceptor } from 'src/interceptors';

@ApiTags('App - Notifications')
@Controller('api/app/notifications')
@UseInterceptors(AppInterceptor)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('getNotifications')
  async getNotifications(
    @Res() response: Response,
    @Body() request: NotificationDTO,
  ) {
    try {
      const notifications =
        await this.notificationsService.getNotifications(request);
      return response.status(HttpStatus.OK).json({
        notifications,
      });
    } catch (e) {
      throw new UnprocessableEntityException(
        'Connection error, please try again',
        e.message,
      );
    }
  }
}
