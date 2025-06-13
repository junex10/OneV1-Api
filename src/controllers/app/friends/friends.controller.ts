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
  SetFriendsDTO,
  GetFriendsDTO,
  CheckFriendSubscriptionDTO,
} from './friends.entity';
import { AppFriendsService } from './friends.service';

@ApiTags('App - Friends')
@Controller('api/app/friends')
export class AppFriendsController {
  constructor(private readonly mapService: AppFriendsService) {}

  @Post('/setFriend')
  async setFriend(@Body() request: SetFriendsDTO, @Res() response: Response) {
    try {
      const places = await this.mapService.setFriend(request);

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

  @Post('/getFriends')
  async getFriends(@Body() request: GetFriendsDTO, @Res() response: Response) {
    try {
      const friends = await this.mapService.getFriends(request);

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
  @Post('/checkFriendSubscription')
  async checkFriendSubscription(
    @Body() request: CheckFriendSubscriptionDTO,
    @Res() response: Response,
  ) {
    try {
      const friends = await this.mapService.checkFriendSubscription(request);

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
