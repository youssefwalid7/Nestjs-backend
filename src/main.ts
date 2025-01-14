import {TypeormExceptionFilter} from '@/common/filters/typeorm-exception.filter';
import {INestApplication, ValidationError, ValidationPipe, VersioningType} from '@nestjs/common';
import {NestApplicationOptions} from '@nestjs/common/interfaces/nest-application-options.interface';
import {ValidationPipeOptions} from '@nestjs/common/pipes/validation.pipe';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import helmet, {HelmetOptions} from 'helmet';
import {AppModule} from './app.module';
import {GlobalExceptionFilter} from './common/filters/global-exception.filter';
import {HttpExceptionFilter} from './common/filters/http-exception.filter';
import {ValidationExceptionFilter} from './common/filters/validation-exception.filter';
import {ValidationErrorMessages, ValidationException} from './common/filters/validation.exception';
import {Environments} from './Environments';

function setupSwagger(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle(Environments.SWAGGER_TITLE)
		.setDescription(Environments.SWAGGER_DESCRIPTION)
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token From Cognito',
			},
			'access-token',
		)
		.addServer(`http://localhost:${Environments.SERVER_PORT}`)
		.addGlobalParameters({name: 'Accept-Language', in: 'header'})
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});
}

const appOptions: NestApplicationOptions = {
	cors: true,
	logger: Environments.isProduction() ? ['log', 'error'] : ['log', 'debug', 'error', 'verbose', 'warn'],
};

const helmetOptions: HelmetOptions = {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			styleSrc: ["'self'"],
			scriptSrc: ["'self'"],
			objectSrc: ["'self'"],
			upgradeInsecureRequests: [],
		},
	},
	referrerPolicy: {policy: 'same-origin'},
};

const extractErrorMessages = (errors: ValidationError[]): ValidationErrorMessages => {
	const messages: ValidationErrorMessages = {};
	errors.forEach(error => {
		if (error?.constraints) {
			messages[error?.property] = Object.values(error.constraints)?.[0];
		} else if (error?.children?.length) {
			messages[error?.property] = extractErrorMessages(error.children);
		} else {
			messages[error?.property] = 'Fields are invalid';
		}
	});
	return messages;
};

const validationPipeOptions: ValidationPipeOptions = {
	transform: true,
	whitelist: true,
	exceptionFactory: (errors: ValidationError[]): ValidationException => {
		const messages: {[key: string]: string} = {};
		errors.forEach(error => {
			messages[error?.property] = error?.constraints ? Object.values(error?.constraints)?.[0] : 'Fields are invalid';
		});
		return new ValidationException(extractErrorMessages);
	},
};

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule, appOptions);
	app.enableVersioning({type: VersioningType.URI});
	app.use(helmet(helmetOptions));

	/** PIPES */
	app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

	/** FILTERS */
	app.useGlobalFilters(
		new GlobalExceptionFilter(),
		new HttpExceptionFilter(),
		new ValidationExceptionFilter(),
		new TypeormExceptionFilter(),
	);

	/** SWAGGER */
	const enableSwagger = !Environments.isProduction();
	if (enableSwagger) {
		setupSwagger(app);
	}

	const port = parseInt(Environments.SERVER_PORT, 10);
	await app.listen(port);
	console.info(`Server is running in ${Environments.NODE_ENV} mode on http://localhost:${Environments.SERVER_PORT}`);
	if (enableSwagger) {
		console.info(`Documentation: http://localhost:${Environments.SERVER_PORT}/api`);
	}
}

bootstrap();
