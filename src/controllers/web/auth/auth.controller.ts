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
	LoginParams,
	RegisterParams,
	RecoverParams,
	CheckCodeParams,
	ResetParams,
	VerifyUserDTO,
	PermissionDTO,
	VerifyEmailDTO,
	PagesDTO
} from './auth.entity';
import { AuthService } from './auth.service';
import { Constants, Hash, UploadFile, JWTAuth } from 'src/utils';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {

	}
	@Post('/login')
	async login(@Body() request: LoginParams, @Res() response: Response) {
		try {
			const user = await this.authService.findUserVerified(request.email);
			const errorMessage = 'The credentials entered are incorrect and/or the account is not verified, please try again';
			if (!user) {
				return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
					error: errorMessage
				});
			}
			if (await Hash.check(request.password, user.password)) {

				const permissions = user.level.permissions;
				const userFilter = {
					id: user.id,
					email: user.email,
					level: user.level,
					photo: user.photo,
					verified: user.verified,
					status: user.status,
					person: user.person
				};
				const token = JWTAuth.createToken({ permissions });
				return response.status(HttpStatus.OK).json({
					data: {
						user: userFilter,
						...token
					}
				});
			}
			else {
				return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
					error: errorMessage
				});
			}
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}

	@Post('/register')
	@UseInterceptors(FileInterceptor('photo',
		UploadFile('users')
	))
	async register(@Body() request: RegisterParams, @Res() response: Response, @UploadedFile() file: Express.Multer.File) {
		try {
			if (request.password != request.password_confirmation) {
				return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
					error: 'The password are not the same each other'
				});
			}

			const _user = await this.authService.findByEmail(request.email);

			if (_user) {
				return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
					error: 'The email is already registered'
				});
			}

			const user = await this.authService.createUser(request, file);

			return response.status(HttpStatus.OK).json({
				user
			});
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}

	@Post('/recover')
	async recover(@Body() request: RecoverParams, @Res() response: Response) {
		try {
			const user = await this.authService.findByEmail(request.email);

			if (!user || user.level_id == Constants.LEVELS.ADMIN) {
				return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
					error: 'The email is already registered'
				});
			}

			await this.authService.recover(request, user);

			return response.status(HttpStatus.OK).json({
				user
			});
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}

	@Post('/check-code')
	async checkCode(@Body() request: CheckCodeParams, @Res() response: Response) {
		try {
			const password = await this.authService.getCode(request.code);

			if (!password) {
				return response.status(HttpStatus.OK).json({
					result: false
				});
			}

			return response.status(HttpStatus.OK).json({
				result: true
			});
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}

	@Post('/reset')
	async reset(@Body() request: ResetParams, @Res() response: Response) {
		try {
			if (request.password != request.password_confirmation) {
				return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
					error: 'Las contraseñas no coinciden'
				});
			}

			const password = await this.authService.getCode(request.code);

			if (!password) {
				return response.status(HttpStatus.OK).json({
					result: false
				});
			}

			const user = await this.authService.findByPk(password.user_id);

			if (user.level_id == Constants.LEVELS.ADMIN) {
				return response.status(HttpStatus.OK).json({
					result: false
				});
			}

			await this.authService.updatePassword(request, user, password);

			return response.status(HttpStatus.OK).json({
				result: true
			});
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}

	@Post('/modules/:level')
	async modules(@Param() params, @Res() response: Response) {
		try {
			return response.status(HttpStatus.OK).json({
				modules: await this.authService.getModules(params.level)
			});
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}

	@Post('/verify')
	async verify(@Res() response: Response, @Body() request: VerifyUserDTO) {
		try {
			const url: string = request.url;
			const verified: number = await this.authService.verify(url);
			if (verified) {
				return response.status(HttpStatus.OK).json({
					message: 'User verified correctly'
				});
			} else {
				return response.status(HttpStatus.OK).json({
					error: 'We could not verified the user and/or the user was verified'
				});
			}
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}

	@Post('checkPermissions')
	async checkPermissions(@Res() response: Response, @Body() request: PermissionDTO) {
		try {
			const verified: boolean = await this.authService.checkPermissions(request.token, request.code);
			if (!verified) {
				return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
					error: 'You do not have access to this page'
				});
			} else {
				return response.status(HttpStatus.OK).json({
					message: 'Access allowed'
				});
			}
		}
		catch (e) {
			throw new UnprocessableEntityException('Connection error, please try again', e.message);
		}
	}
}
