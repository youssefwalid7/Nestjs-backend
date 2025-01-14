import {Environments} from '@/Environments';
import {TypeOrmModuleAsyncOptions, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {TypeormNamingStrategy} from './typeorm-naming-strategy';

export class TypeormConfig {
	public static getOrmConfig(): TypeOrmModuleOptions {
		return {
			parseInt8: true,
			type: 'postgres',
			database: Environments.DB_NAME,
			host: Environments.DB_HOST,
			port: Number(Environments.DB_PORT),
			username: Environments.DB_USERNAME,
			password: Environments.DB_PASSWORD,
			entities: [__dirname + '/../**/*.entity{.ts,.js}'],
			migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
			migrationsRun: true,
			synchronize: false,
			logging: Environments.isDevelopment(),
			ssl: false,
			namingStrategy: new TypeormNamingStrategy(),
		};
	}
}

export const typeormConfigAsync: TypeOrmModuleAsyncOptions = {
	imports: [],
	useFactory: async (): Promise<TypeOrmModuleOptions> => TypeormConfig.getOrmConfig(),
	inject: [],
};
