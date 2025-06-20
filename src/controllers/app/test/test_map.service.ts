import { Injectable, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/sequelize';
import { User, Person, Events, Friends } from 'src/models';
import { SetEvents, SetFriends } from './test_map.entity';
import { Constants, Globals } from 'src/utils';

const GOOGLE_API = process.env.GOOGLE_API;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class AppTestMapService {
  constructor(
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(Events) private eventModel: typeof Events,
    @InjectModel(Friends) private friendModel: typeof Friends,
    private readonly http: HttpService,
  ) {}

  async setEvents(@Body() request: any) {
    try {
      const data = request?.places.map((item: any, index: number) => {
        return {
          event_type_id: 1, // -> Party ID
          user_id: 5, // Test user number
          main_pic: null,
          title: `TEST TITLE ${index}`,
          content: `PARTY TEST ${index}`,
          latitude: item?.location?.lat.toString(),
          longitude: item?.location?.lng.toString(),
          likes: Globals.randomInt(0, 1000),
          status: Constants.EVENT_STATUS.ACTIVE,
          address: 'Test address fake one',
          expiration_time: new Date(Date.now() + 6 * 60 * 60 * 1000),
        };
      });

      const event = await this.eventModel.bulkCreate(data);

      if (event) {
        return data;
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  async setFriends(@Body() request: []) {
    try {
      const friends = await this.friendModel.bulkCreate(request);
      if (friends) return friends;

      return null;
    } catch (e) {
      return null;
    }
  }
}
