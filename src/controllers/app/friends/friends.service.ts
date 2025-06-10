import { Injectable, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/sequelize';
import { User, Person, Friends } from 'src/models';
import { SetFriendsDTO, GetFriendsDTO } from './friends.entity';
import { Constants, Globals } from 'src/utils';
import { Sequelize, Op } from 'sequelize';

@Injectable()
export class AppFriendsService {
  constructor(
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Friends) private friendModel: typeof Friends,
    private readonly http: HttpService,
  ) {}

  async setFriend(@Body() request: SetFriendsDTO) {
    try {
      const friend = await this.friendModel.create({
        sender_id: request.sender_id, // -> The current user who is sending petition to be friends
        receiver_id: request.receiver_id, // -> Receiver who will get the notification and decide if he/she wants to be friends with sender
        status: Constants.USER.FRIENDS.PENDING,
      });
      if (friend) return friend;
    } catch (e) {
      return null;
    }
  }

  async getFriends(@Body() request: GetFriendsDTO) {
    // Friends list who already accepted sender friend petition
    try {
      const friends = await this.friendModel.findAndCountAll({
        where: {
          status: Constants.USER.FRIENDS.ACCEPTED,
          [Op.or]: [
            { sender_id: request.user_id },
            { receiver_id: request.user_id },
          ],
        },
        include: [
          { model: User, as: 'sender', include: [Person] },
          { model: User, as: 'receiver', include: [Person] },
        ],
      });
      // Filter to return only the friend (not the current user)
      const friendList = friends.rows.map((friend) => {
        const user =
          friend.sender_id === request.user_id
            ? friend.receiver
            : friend.sender;
        return {
          id: user.id,
          email: user.email,
          person: user.person,
          photo: user.photo,
          // add any other fields you want to expose
        };
      });

      return { count: friendList.length, friends: friendList };
    } catch (e) {
      return null;
    }
  }
}
