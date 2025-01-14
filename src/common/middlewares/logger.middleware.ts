import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger(`HTTP`);

	public use(request: Request, response: Response, next: NextFunction): void {
		const {method, originalUrl, ip} = request;
		const userAgent = request.get('User-Agent') || '';
		const startTime = Date.now();

		response.on('finish', () => {
			const {statusCode} = response;
			const user = request.user;
			const responseTime = Date.now() - startTime;

			this.logger.log(
				`Method: ${method} | URL: ${originalUrl} | StatusCode: ${statusCode} | ResponseTime: ${responseTime} ms | ${ip} | User Agent: ${userAgent} | ${
					user ? user : 'Public'
				} | Headers: ${JSON.stringify(request.headers)} | ${
					method !== 'GET' ? 'Body: ' + JSON.stringify(request.body) : ''
				} `,
			);
			if (statusCode === 500) {
				this.logger.error(`| Severity:High | Message:Unknown Error Happened in the route ${originalUrl} |`);
			}
		});
		next();
	}
}
