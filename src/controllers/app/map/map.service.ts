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

		try {
			const places = await this.http.post(`${GOOGLE_API}place/nearbysearch/json?location=${request.lat},${request.lng}&radius=1000&key=${GOOGLE_API_KEY}`).toPromise();
			return places?.data?.results;
		} catch(e) {
			return null;
		}

	}

}
