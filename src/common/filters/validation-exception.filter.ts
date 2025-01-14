import {Environments} from '@/Environments';
import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {Request} from 'express';
import {ValidationException} from './validation.exception';

interface IError {
	statusCode: number;
	error: string;
	message: string;
	validationErrors?: {[key: string]: string};
}

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
	public catch(exception: ValidationException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse();
		const error: IError = {
			statusCode: 400,
			error: 'Bad Request',
			message: 'Some fields are missing or invalid',
		};
		const isAdmin = request?.url?.startsWith('/admin');
		if (!Environments.isProduction() || isAdmin) {
			error.validationErrors = exception.validationErrors;
		}
		return response.status(400).contentType('application/json').json(error);
	}
}
