import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';

export const AuthUser = createParamDecorator((data, context: ExecutionContext): Express.User | undefined => {
	const {user} = context.switchToHttp().getRequest<Request>();
	return user;
});
