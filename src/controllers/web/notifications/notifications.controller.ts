import { Body, Controller, HttpStatus, Param, Post, Res, UnprocessableEntityException } from '@nestjs/common';

import { Response } from 'express';
import { NotificationsService } from './notifications.service';
import {
    NotificationDTO
} from './notifications.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('api/notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    @Post('newTreatment')
    async newTreatment(@Res() response: Response, @Body() request: NotificationDTO) {
        try {
            const notification = await this.notificationsService.newTreatment(request);
            return response.status(HttpStatus.OK).json({
                notification
            });
        }
        catch(e) {
            throw new UnprocessableEntityException('Connection error, please try again', e.message);
        }
    }
}
