import {I18nTranslations} from '@/i18n/i18n';
import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';
import {I18nContext} from 'nestjs-i18n';

/** Built-in HTTP exceptions
 * BadRequestException
 * UnauthorizedException
 * NotFoundException
 * ForbiddenException
 * NotAcceptableException
 * RequestTimeoutException
 * ConflictException
 * GoneException
 * HttpVersionNotSupportedException
 * PayloadTooLargeException
 * UnsupportedMediaTypeException
 * UnprocessableEntityException
 * InternalServerErrorException
 * NotImplementedException
 * ImATeapotException
 * MethodNotAllowedException
 * BadGatewayException
 * ServiceUnavailableException
 * GatewayTimeoutException
 * PreconditionFailedException
 * */

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	public catch(exception: HttpException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const i18n = I18nContext.current<I18nTranslations>(host);

		const responseMessage = request?.url?.startsWith('/admin')
			? exception.message
			: i18n?.translate('common.errors.serverError');

		response.status(status).contentType('application/json').json({
			statusCode: status,
			message: responseMessage,
		});
	}
}
