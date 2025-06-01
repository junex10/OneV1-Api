import { Body, Controller, Post, Res, HttpStatus, UseInterceptors, UploadedFile, UnprocessableEntityException, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { Constants, UploadFile, JWTAuth } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
    
} from './home.entity';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller('api/home')
export class HomeController {
    constructor(
        private readonly homeService: HomeService
    ) {

    }

    /*@Post()
    async get(@Body() request: any, @Res() response: Response) {
        try {
            const recipes = await this.homeService.getRecipes(request);
            
            return response.status(HttpStatus.OK).json({
				recipes
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('Could not get the Recipes', e.message);
        }
    }*/
}
