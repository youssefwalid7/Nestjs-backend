import {JwtAuthGuard} from '@/common/auth/guards/jwt-auth.guard';
import {UpdateUserDto} from '@/common/dtos/update-user.dto';
import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Put, Query, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {UserService} from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getUserById(@Param('id') id: number) {
		try {
			const user = await this.userService.getUserById(id);
			if (!user) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}
			return {success: true, data: user};
		} catch (error: any) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get()
	async getUserByEmail(@Query('email') email: string) {
		try {
			const user = await this.userService.getUserByEmail(email);
			if (!user) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}
			return {success: true, data: user};
		} catch (error: any) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	async deleteUserById(@Param('id') id: number) {
		try {
			const result = await this.userService.deleteById(id);
			if (!result) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}
			return {success: true, message: 'User deleted successfully'};
		} catch (error: any) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Put(':id')
	async updateUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
		try {
			const updatedUser = await this.userService.updateUserById(id, updateUserDto);
			return {success: true, data: updatedUser};
		} catch (error: any) {
			if (error.message === 'User not found') {
				throw new HttpException(error.message, HttpStatus.NOT_FOUND);
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
