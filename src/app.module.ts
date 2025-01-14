import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {ThrottlerModule} from '@nestjs/throttler';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './apps/auth/auth.module';
import {HealthModule} from './apps/health/health.module';
import {UserModule} from './apps/user/user.module';
import {LoggerMiddleware} from './common/middlewares/logger.middleware';
import {SecurityHeadersMiddleware} from './common/middlewares/security.middleware';
import {throttlerConfig} from './config/throttler.config';
import {typeormConfigAsync} from './config/typeorm.config';
import {DataServiceModule} from './data-service/data-service.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync(typeormConfigAsync),
		ThrottlerModule.forRoot([throttlerConfig]),
		DataServiceModule,
		HealthModule,
		UserModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LoggerMiddleware).exclude('health').forRoutes('*');
		consumer.apply(SecurityHeadersMiddleware).forRoutes('*');
	}
}
