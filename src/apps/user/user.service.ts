// src/user/user.service.ts
import {UserResponseDto} from '@/common/dtos/user-response.dto';
import {UserDto} from '@/common/dtos/user.dto';
import {User} from '@/data-service/entities/user.entity';
import {UserRepository} from '@/data-service/repositories/user.repository';
import {hashPassword} from '@/utilities/helpers';
import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	/**
	 * Get user by ID
	 * @param id - User ID
	 * @returns User entity or throws NotFoundException
	 */
	async getUserById(id: number): Promise<User> {
		try {
			const user = await this.userRepository.getById(id);
			if (!user) {
				throw new NotFoundException(`User not found`);
			}
			return user;
		} catch (error) {
			console.error(`Error fetching user by ID: ${id}`, error);
			throw new InternalServerErrorException('An error occurred while fetching the user');
		}
	}

	/**
	 * Get user by email
	 * @param email - User email
	 * @returns User entity or null if not found
	 */
	async getUserByEmail(email: string): Promise<User | null> {
		try {
			return this.userRepository.getByEmail(email);
		} catch (error) {
			console.error(`Error fetching user by email: ${email}`, error);
			throw new InternalServerErrorException('An error occurred while fetching the user');
		}
	}

	/**
	 * Delete user by ID
	 * @param id - User ID
	 * @returns Success message or throws NotFoundException
	 */
	async deleteById(id: number): Promise<{message: string}> {
		try {
			const user = await this.getUserById(id);
			await this.userRepository.deleteById(user.id);
			return {message: `User successfully deleted`};
		} catch (error) {
			console.error(`Error deleting user by ID: ${id}`, error);
			throw new InternalServerErrorException('An error occurred while deleting the user');
		}
	}

	/**
	 * Create a new user
	 * @param user - User DTO
	 * @returns UserResponseDto
	 */
	async createUser(user: UserDto): Promise<UserResponseDto> {
		try {
			const newUser = await this.userRepository.createUser(user);
			return {
				data: {id: newUser.data.id, name: newUser.data.name, email: newUser.data.email},
				status: 'success',
				message: 'User successfully created',
			};
		} catch (error) {
			console.error('Error creating user', error);
			throw new InternalServerErrorException('An error occurred while creating the user');
		}
	}

	/**
	 * Update user by ID
	 * @param id - User ID
	 * @param user - Partial user data
	 * @returns UserResponseDto
	 */
	async updateUserById(id: number, user: Partial<UserDto>): Promise<UserResponseDto> {
		try {
			const existingUser = await this.userRepository.getById(id);
			if (!existingUser) {
				throw new NotFoundException(`User with ID ${id} not found`);
			}
			if (user.password) {
				user.password = await hashPassword(user.password);
			}
			const updatedUser = await this.userRepository.updateUser({...existingUser, ...user});
			return {status: 'success', message: 'User successfully updated', data: updatedUser};
		} catch (error: any) {
			console.error(`Error updating user: ${error.message}`);
			throw new InternalServerErrorException('An error occurred while updating the user');
		}
	}
}
