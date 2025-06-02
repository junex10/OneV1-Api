import { Injectable, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from "@nestjs/sequelize";
import { User, PasswordReset, Modules, Permissions, Level, Person } from "src/models";
import { MailerService } from '@nestjs-modules/mailer';
import { Coordinates } from './map.entity';
import { Constants, Hash, Globals, JWTAuth } from 'src/utils';
import * as moment from 'moment';
import { config } from 'dotenv';

const GOOGLE_API = process.env.GOOGLE_API;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class AppMapService {

	constructor(
		@InjectModel(User) private userModel: typeof User,
		@InjectModel(Person) private personModel: typeof Person,
		private readonly http: HttpService
	) {

	}

	async getPlacesNearby(@Body() request: Coordinates) {

		console.log('REQUESTED')

		try {
			const places = await this.http.post(`${GOOGLE_API}place/nearbysearch/json?location=${request.latitude},${request.longitude}&radius=1000&key=${GOOGLE_API_KEY}`).toPromise();

			const data = places?.data?.results?.map(item => {
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
					user_ratings_total: item?.user_ratings_total || null
				}
			});

			// Add here business model logic later

			return data;
		} catch(e) {
			return null;
		}

	}

}
