import {LoginDto} from '@/common/dtos/login.dto';
import {SignUpDto} from '@/common/dtos/sign-up.dto';
import {Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import {ThrottlerGuard} from '@nestjs/throttler';
import {Response} from 'express';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-up')
	async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response): Promise<Response> {
		try {
			console.log(signUpDto);
			const result = await this.authService.signUp(signUpDto);
			if (result.error) {
				return res.status(HttpStatus.BAD_REQUEST).json({
					status: 'error',
					message: result.message,
				});
			}
			return res.status(HttpStatus.CREATED).json({
				result,
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: 'error',
				message: 'An unexpected error occurred',
			});
		}
	}

	@UseGuards(ThrottlerGuard)
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<Response> {
		try {
			const result = await this.authService.login(loginDto);
			if (result.error) {
				return res.status(HttpStatus.UNAUTHORIZED).json({
					status: 'error',
					message: result.message,
				});
			}
			return res.status(HttpStatus.OK).json({
				status: 'success',
				token: result.token,
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: 'error',
				message: 'An unexpected error occurred',
			});
		}
	}
}
