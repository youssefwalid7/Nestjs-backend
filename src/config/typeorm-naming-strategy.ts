import {NamingStrategyInterface} from 'typeorm';
import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import {snakeCase} from 'typeorm/util/StringUtils';

export class TypeormNamingStrategy extends SnakeNamingStrategy implements NamingStrategyInterface {
	public override tableName(className: string, customName: string): string {
		return customName ? customName : snakeCase(className).replace('_entity', '');
	}
}
