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
	UnprocessableEntityException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import {
	Coordinates
} from './map.entity';
import { AppMapService } from './map.service';

@ApiTags('App - Map')
@Controller('api/app/map')
export class AppMapController {

	constructor(private readonly mapService: AppMapService) {

	}
	@Post('/placesNearby')
	async login(@Body() request: Coordinates, @Res() response: Response) {
		try {
			const places = await this.mapService.getPlacesNearby(request);

			if (!places) return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Connection error, please try again' });
            
            return response.status(HttpStatus.OK).json({
				places
			});
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}

	
}
