import {UserResponseDto} from '@/common/dtos/user-response.dto';
import {UserDto} from '@/common/dtos/user.dto';
import {User} from '@/data-service/entities/user.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	getById(id: number) {
		return this.userRepository.findOne({
			where: {id},
			select: ['id', 'name', 'email'],
		});
	}

	getByEmail(email: string) {
		return this.userRepository.findOne({
			where: {email},
			select: ['id', 'name', 'email', 'password'],
		});
	}

	deleteById(id: number) {
		return this.userRepository.delete(id);
	}

	async createUser(user: UserDto): Promise<UserResponseDto> {
		const createdUser = await this.userRepository.save(user);
		return {
			status: 'success',
			message: 'User created successfully',
			data: {id: createdUser.id, name: createdUser.name, email: createdUser.email},
		};
	}

	updateUser(user: UserDto) {
		return this.userRepository.save(user);
	}
}
