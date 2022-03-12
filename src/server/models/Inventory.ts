import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Characters } from '@/models';

@Entity()
export class Inventory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('json')
	inventory!: object;

	@OneToOne(() => Characters)
	@JoinColumn()
	character!: Characters;
}

// export const Inventory = sequelize.define('inventory', {});
