import {Variable} from '@decorators/env-variable.decorator';
import {config} from 'dotenv';

config();

export class Environments {
	@Variable('NODE_ENV')
	public static NODE_ENV: string;
	@Variable('SERVER_PORT', '3000')
	public static SERVER_PORT: string;

	/** Database Connection */
	@Variable('DB_PORT', '5432')
	public static DB_PORT: string;
	@Variable('DB_USERNAME')
	public static DB_USERNAME: string;
	@Variable('DB_PASSWORD')
	public static DB_PASSWORD: string;
	@Variable('DB_HOST')
	public static DB_HOST: string;
	@Variable('DB_NAME')
	public static DB_NAME: string;

	@Variable('BCRYPT_SALT_ROUNDS')
	public static BCRYPT_SALT_ROUNDS: number;
	@Variable('JWT_SECRET')
	public static JWT_SECRET: string;
	@Variable('JWT_EXPIRATION_TIME')
	public static JWT_EXPIRATION_TIME: string;

	/** Swagger */
	@Variable('SWAGGER_TITLE', 'Elchai Backend')
	public static SWAGGER_TITLE: string;
	@Variable('SWAGGER_DESCRIPTION', 'Elchai Backend API')
	public static SWAGGER_DESCRIPTION: string;

	public static isTesting = (): boolean => Environments.NODE_ENV === 'test';
	public static isDevelopment = (): boolean => Environments.NODE_ENV === 'development';
	public static isProduction = (): boolean => Environments.NODE_ENV === 'production';
	public static isStaging = (): boolean => Environments.NODE_ENV === 'staging';

	public static getEnvironmentStage = (): string => (Environments.isProduction() ? 'production' : 'staging');
}
