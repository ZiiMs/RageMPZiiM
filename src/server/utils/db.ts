import { getItems } from '@/events';
import { Account, Characters, Inventory, Items } from '@/models';
import { config } from 'dotenv';
import path from 'path';
import { createConnection } from 'typeorm';

config({
	path: path.resolve('.env')
});

let retry = 0;

const connect = async () => {
	try {
		const connection = await createConnection({
			type: 'mysql',
			host: process.env.DATABASE_HOST,
			port: 3306,
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASS,
			database: process.env.DATABASE_DB,
			entities: [Items, Characters, Inventory, Account],
			synchronize: true,
			logging: false
		});
		if (!connection.isConnected) {
			console.log('Reconnect');
			connection.connect();
			setTimeout(connect, 2000);
		} else {
			getItems();
			console.log('Connected to DB successfully & getting items');
		}
	} catch (e: any) {
		if (retry !== 1) {
			setTimeout(connect, 1000);
			retry = 1;
		}
		console.error(e);
	}
};

connect();
// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.');
// 	})
// 	.catch((e: any) => {
// 		console.error('Unable to connect to the database:', e);
// 	});
