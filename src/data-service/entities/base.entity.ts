import {BaseEntity as BaseEntityTypeorm, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export abstract class BaseEntity extends BaseEntityTypeorm {
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	public readonly id: number;

	@CreateDateColumn({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	public createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	public updatedAt: Date;
}
