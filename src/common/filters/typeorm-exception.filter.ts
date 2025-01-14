import {LoggerHandler} from '@/common/logger/logger.handler';
import {LOG_SEVERITY} from '@/common/types/logger.type';
import {I18nTranslations} from '@/i18n/i18n';
import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import {I18nContext} from 'nestjs-i18n';
import {QueryFailedError} from 'typeorm';

interface IError {
	statusCode: number;
	error: string;
	message?: string;
}

interface PostgresError extends Error {
	code: string;
	detail: string;
}

enum TYPEORM_ERROR_CODE {
	CONFLICT = '23505',
}

@Catch(QueryFailedError)
export class TypeormExceptionFilter implements ExceptionFilter {
	public catch(exception: QueryFailedError<PostgresError>, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const i18n = I18nContext.current<I18nTranslations>(host);

		const error: IError = {
			statusCode: HttpStatus.BAD_REQUEST,
			error: 'Bad Request',
			message: i18n?.translate('common.errors.serverError'),
		};

		if (exception.driverError.code === TYPEORM_ERROR_CODE.CONFLICT) {
			error.statusCode = HttpStatus.CONFLICT;
			error.error = 'Conflict';
		}

		LoggerHandler.error({
			severity: LOG_SEVERITY.critical,
			message: exception.driverError.detail,
			exception,
		});

		return response.status(error.statusCode).contentType('application/json').json(error);
	}
}
