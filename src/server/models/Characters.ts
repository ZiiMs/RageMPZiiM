import { Account } from '@/models';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity()
export class Characters extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	age!: number;

	@Column({ default: 2500 })
	cash!: number;

	@Column({ default: 10000 })
	bank!: number;

	@ManyToOne(() => Account, (account) => account.characters)
	account!: Relation<Account>;

	@CreateDateColumn()
	createdAt!: Date;
}

// export class Characters extends Model {
// 	declare id: CreationOptional<number>;
// 	declare name: string;
// 	declare age: number;
// 	declare cash: CreationOptional<number>;
// 	declare bank: CreationOptional<number>;
// 	declare createdAt: CreationOptional<Date>;

// 	declare updatedAt: CreationOptional<Date>;
// }

// Characters.init(
// 	{
// 		id: {
// 			type: DataTypes.INTEGER,
// 			autoIncrement: true,
// 			allowNull: false,
// 			primaryKey: true
// 		},
// 		name: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		age: {
// 			type: DataTypes.INTEGER,
// 			allowNull: false
// 		},
// 		cash: {
// 			type: DataTypes.INTEGER,
// 			defaultValue: 2500,
// 			allowNull: false
// 		},
// 		bank: {
// 			type: DataTypes.INTEGER,
// 			defaultValue: 10000,
// 			allowNull: true
// 		},
// 		createdAt: DataTypes.DATE,
// 		updatedAt: DataTypes.DATE
// 	},
// 	{
// 		tableName: 'characters',
// 		sequelize
// 	}
// );

// export const Inventory = sequelize.define('inventory', {});
