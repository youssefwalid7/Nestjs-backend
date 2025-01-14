import {LoggerHandler} from '@/common/logger/logger.handler';
import {LOG_SEVERITY} from '@/common/types/logger.type';
import {I18nTranslations} from '@/i18n/i18n';
import {ArgumentsHost, Catch, HttpException, HttpStatus} from '@nestjs/common';
import {BaseExceptionFilter} from '@nestjs/core';
import {Response} from 'express';
import {I18nContext} from 'nestjs-i18n';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
	public override catch(exception: unknown, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const i18n = I18nContext.current<I18nTranslations>(host);

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		LoggerHandler.error({
			severity: LOG_SEVERITY.critical,
			exception: exception,
		});

		response
			.status(status)
			.contentType('application/json')
			.json({
				statusCode: status,
				message: i18n?.translate('common.errors.serverError'),
			});
	}
}
