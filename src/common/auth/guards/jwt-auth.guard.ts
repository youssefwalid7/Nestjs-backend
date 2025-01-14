import {Environments} from '@/Environments';
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = Environments.JWT_SECRET;

@Injectable()
export class JwtAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException('Token not provided');
		}

		try {
			const payload = jwt.verify(token, SECRET_KEY);
			request['user'] = payload; // Attach user payload to the request object
			return true;
		} catch (error) {
			throw new UnauthorizedException('Invalid or expired token');
		}
	}

	private extractTokenFromHeader(request: Request): string | null {
		const authHeader = request.headers.authorization;
		if (authHeader && authHeader.startsWith('Bearer ')) {
			return authHeader.split(' ')[1]; // Extract the token after "Bearer"
		}
		return null;
	}
}
