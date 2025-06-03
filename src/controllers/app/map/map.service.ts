import { Injectable, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/sequelize';
import { User, Person, Events } from 'src/models';
import { Coordinates, GetEvents, Route } from './map.entity';
import { Sequelize } from 'sequelize';

const GOOGLE_API = process.env.GOOGLE_API;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class AppMapService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(Events) private eventModel: typeof Events,
    private readonly http: HttpService,
  ) {}

  async getPlacesNearby(@Body() request: Coordinates) {
    try {
      const places = await this.http
        .post(
          `${GOOGLE_API}place/nearbysearch/json?location=${request.latitude},${request.longitude}&radius=10000&key=${GOOGLE_API_KEY}`,
        )
        .toPromise();

      const data = places?.data?.results?.map((item) => {
        return {
          location: item?.geometry?.location,
          icon: item?.icon,
          icon_background_color: item?.icon_background_color,
          name: item?.name,
          photos: item?.photos,
          place_id: item?.place_id,
          types: item?.types,
          business_status: item?.business_status || null,
          rating: item?.rating || null,
          user_ratings_total: item?.user_ratings_total || null,
        };
      });

      // Add here business model logic later

      return data;
    } catch (e) {
      return null;
    }
  }

  async getRouteDirection(@Body() request: Route) {
    try {
      let route: string = `${GOOGLE_API}directions/json?origin=${request.origin.latitude},${request.origin.longitude}&destination=${request.destination.latitude},${request.origin.longitude}&key=${GOOGLE_API_KEY}`;

      if (request.waypoint) {
        route = `${GOOGLE_API}directions/json?origin=${request.origin.latitude},${request.origin.longitude}&destination=${request.destination.latitude},${request.origin.longitude}&waypoints=${request.waypoint.latitude},${request.waypoint.longitude}&key=${GOOGLE_API_KEY}`;
      }
      const getRoute = await this.http.post(route).toPromise();

      const data = getRoute?.data?.routes?.places[0];

      // Add here business model logic later
      return data;
    } catch (e) {
      return null;
    }
  }
  async getEvents(@Body() request: GetEvents) {
    const radius = 10000; // Value in meters
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
      `),
      });

      return data;
    } catch (e) {
      return null;
    }
  }
}
