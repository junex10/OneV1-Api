import { Injectable, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/sequelize';
import { User, Person, Events } from 'src/models';
import {
  GetEventDTO,
  GetEventsByUserDTO,
  GetEventsDTO,
  SetEventDTO,
} from './event.entity';
import { Constants, Globals } from 'src/utils';
import { Sequelize } from 'sequelize';

const GOOGLE_API = process.env.GOOGLE_API;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class AppEventsService {
  constructor(
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(Events) private eventModel: typeof Events,
    private readonly http: HttpService,
  ) {}

  async setEvent(@Body() request: SetEventDTO) {
    try {
      // We create only 1 event
      const data = {
        ...request,
        main_pic: request?.main_pic
          ? request?.main_pic
          : `${process.env.BASE_URL}/img/random_location.jpg`,
        latitude: request?.latitude.toString(),
        longitude: request?.longitude.toString(),
        likes: request.likes ? request.likes : 0,
        status: request?.likes ? request?.likes : Constants.EVENT_STATUS.ACTIVE,
        expiration_time: request?.expiration_time
          ? request?.expiration_time
          : new Date(Date.now() + 6 * 60 * 60 * 1000), // Default is 24 hours
      };

      const event = await this.eventModel.create(data);

      if (event) {
        return data;
      }

      // Add here business model logic later
      return null;
    } catch (e) {
      return null;
    }
  }

  async getEvents(@Body() request: GetEventsDTO) {
    const radius = 10000; // Value in meters
    const excludeRadius = 10;
    try {
      const data = await this.eventModel.findAll({
        where: Sequelize.literal(`
          (
            6371000 * acos(
              cos(radians(${request.latitude}))
              * cos(radians(CAST(latitude AS DECIMAL(10,7))))
              * cos(radians(CAST(longitude AS DECIMAL(10,7))) - radians(${request.longitude}))
              + sin(radians(${request.latitude}))
              * sin(radians(CAST(latitude AS DECIMAL(10,7))))
            )
          ) < ${radius}
          AND (
            6371000 * acos(
              cos(radians(${request.latitude}))
              * cos(radians(CAST(latitude AS DECIMAL(10,7))))
              * cos(radians(CAST(longitude AS DECIMAL(10,7))) - radians(${request.longitude}))
              + sin(radians(${request.latitude}))
              * sin(radians(CAST(latitude AS DECIMAL(10,7))))
            )
          ) >= ${excludeRadius}
        `),
      });

      return data;
    } catch (e) {
      return null;
    }
  }

  async getEvent(@Body() request: GetEventDTO) {
    try {
      const data = await this.eventModel.findOne({
        where: {
          id: request.event_id,
        },
      });
      return data;
    } catch (e) {
      return null;
    }
  }

  async getEventsByUser(@Body() request: GetEventsByUserDTO) {
    try {
      const data = await this.eventModel.findAndCountAll({
        include: [
          {
            model: User,
            include: [Person],
          },
        ],
        where: {
          user_id: request.user_id,
        },
      });
      return data;
    } catch (e) {
      return null;
    }
  }
}
