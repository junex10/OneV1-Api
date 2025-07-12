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
  SetFriendsDTO,
  GetFriendsDTO,
  CheckFriendSubscriptionDTO,
} from './friends.entity';
import { AppFriendsService } from './friends.service';
import { AppInterceptor } from 'src/interceptors';

@ApiTags('App - Friends')
@Controller('api/app/friends')
@UseInterceptors(AppInterceptor)
export class AppFriendsController {
  constructor(private readonly friendService: AppFriendsService) {}

  @Post('/setFriend')
  async setFriend(@Body() request: SetFriendsDTO, @Res() response: Response) {
    try {
      const places = await this.friendService.setFriend(request);

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
      const friends = await this.friendService.getFriends(request);

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
      const friends = await this.friendService.checkFriendSubscription(request);

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
