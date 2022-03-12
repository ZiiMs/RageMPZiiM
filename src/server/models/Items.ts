import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// const sequelize = require('../db');

@Entity()
export class Items extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column({ default: ' ' })
	description!: string;

	@Column()
	image!: string;

	@Column()
	func!: string;
}

// export const Inventory = sequelize.define('inventory', {});
