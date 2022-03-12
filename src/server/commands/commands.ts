import { getAccount, getItems, items, loginChar } from '@/events';
import { Account, Characters, Inventory } from '@/models';
import { data } from '@/utils/invJson';
import { colors } from '@shared/utils';

mp.events.addCommand('hp', (player) => {
	console.log('Setting H!');
	player.health = 100;
	player.call('addPlayers', [player.id, player.name, player.rgscId]);
});

mp.events.addCommand('updateItems', async (player) => {
	await getItems();
	player.call('sendItems', [items]);
	player.outputChatBox('You have updated items');
});

mp.events.addCommand('createchar', async (player, _, name, age) => {
	console.log(`Name,Age: ${name}, ${age}`);
	const users = await Characters.find({
		where: {
			name: name
		}
	});
	if (users.length !== 0) {
		player.outputChatBox(`${colors.error}[Error]${colors.white} Character already exists with name${colors.error} ${name}`);
		return;
	}
	const ageNum = Number.parseInt(age);
	const account = await getAccount(player);
	const char = Characters.create({
		age: ageNum,
		name: name,
		account: account
	});

	await char.save();
	const inv = Inventory.create({
		inventory: data,
		character: char
	});

	await inv.save();
});

mp.events.addCommand('giveitem', (player, fulltext, itemid) => {
	player.call('addItem', [items[itemid]]);

	player.outputChatBox(`You have been given ${items[itemid].name}!`);
});

mp.events.addCommand('loginChar', async (player, fulltext, charid) => {
	loginChar(player, Number.parseInt(charid));
});

mp.events.addCommand('getChar', async (player) => {
	const char = player.getOwnVariable<Characters>('character');
	player.outputChatBox(
		`CharacterName: ${colors.success}${char?.name}${colors.white} | CharID: ${colors.success}${char?.id}${colors.white} | Age: ${colors.success}${char?.age}${colors.white} `
	);
});

mp.events.addCommand('characters', async (player) => {
	const account = await Account.findOne({
		where: {
			scid: player.rgscId
		},
		relations: ['characters']
	});
	player.outputChatBox(`You have been given ${JSON.stringify(account?.characters)}!`);
});

mp.events.addCommand('armor', (player) => {
	player.armour = 100;
});

mp.events.addCommand('kill', (player) => {
	player.health = 0;
	player.outputChatBox('Killing yourself.');
});

mp.events.addCommand('car', (player, _, car) => {
	player.call('spawnVehicle', [car]);
});

mp.events.addCommand('repair', (player) => {
	const veh = player.vehicle || false;
	if (!veh) return;
	player.outputChatBox(`Repearing vehicle!`);
	veh.repair();
});

mp.events.addCommand('id', (player) => {
	const id = player.id;
	player.outputChatBox(`ID: ${colors.error} ${id}`);
	console.log('Check ID!?!?');
	player.call('checkid', [player]);
});

mp.events.addCommand('insert', (player) => {
	mp.players.forEach((_player) => {
		_player.call('addPlayers', [player.id, player.name, player.rgscId]);
		_player.call('maxPlayers', [mp.config.maxplayers]);
		_player.call('localPlayers', [mp.players.toArray().length]);
	});
});
