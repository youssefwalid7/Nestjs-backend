import {Environments} from '@/Environments';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(+Environments.BCRYPT_SALT_ROUNDS);
	return bcrypt.hash(password, salt);
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
	console.log(plainPassword);
	console.log(hashedPassword);
	return bcrypt.compare(plainPassword, hashedPassword);
}

export function generateJwtToken(payload: Record<string, any>): string {
	return jwt.sign(payload, Environments.JWT_SECRET, {expiresIn: Environments.JWT_EXPIRATION_TIME});
}
