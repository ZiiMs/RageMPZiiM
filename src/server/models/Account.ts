import { Characters } from '@/models';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

export enum AccountRole {
	ADMIN = 'admin',
	SUPPORTER = 'SUPPORTER',
	TESTER = 'TESTER',
	DEFAULT = 'default'
}

@Entity()
export class Account extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	// @Column()
	// name!: string;

	@Column({
		unique: true
	})
	scid!: string;

	@Column({ type: 'enum', enum: AccountRole, default: AccountRole.DEFAULT })
	rank!: AccountRole;

	@OneToMany(() => Characters, (characters) => characters.account)
	characters!: Relation<Characters[]>;

	@CreateDateColumn()
	createdAt!: Date;
}
