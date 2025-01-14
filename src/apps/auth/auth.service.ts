import {LoginDto} from '@/common/dtos/login.dto';
import {SignUpDto} from '@/common/dtos/sign-up.dto';
import {comparePasswords, generateJwtToken, hashPassword} from '@/utilities/helpers';
import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async signUp(signUpDto: SignUpDto): Promise<any> {
		const {name, email, password} = signUpDto;
		console.log(password);
		try {
			const existingUser = await this.userService.getUserByEmail(email);
			if (existingUser) {
				return {error: true, message: 'Email is already in use'};
			}
			const hashedPassword = await hashPassword(password);
			console.log('Hashed Password During Registration:', hashedPassword);
			const newUser = await this.userService.createUser({
				name,
				email,
				password: hashedPassword,
			});
			return newUser;
		} catch (error) {
			console.error(error);
			return {error: true, message: 'An error occurred during registration'};
		}
	}

	async login(loginDto: LoginDto): Promise<any> {
		const {email, password} = loginDto;
		try {
			const user = await this.userService.getUserByEmail(email);
			if (!user) {
				return {error: true, message: 'Invalid credentials'};
			}
			const isPasswordValid = await comparePasswords(password, user.password);
			if (!isPasswordValid) {
				return {error: true, message: 'Invalid credentials'};
			}
			// Generate JWT token
			const token = generateJwtToken({id: user.id, email: user.email, name: user.name});
			return {error: false, token, data: {id: user.id, email: user.email, name: user.name}};
		} catch (error) {
			console.error(error);
			return {error: true, message: 'An error occurred during login'};
		}
	}
}
