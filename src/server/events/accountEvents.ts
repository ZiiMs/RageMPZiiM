import { Account, Characters } from '@/models';
import { colors } from '@shared/utils';
import { items } from './generalEvents';

mp.events.add('playerJoin', async (player) => {
	setupAccount(player);
	mp.players.forEach((_player) => {
		_player.call('addPlayers', [player.id, player.name, player.rgscId]);
		_player.call('maxPlayers', [mp.config.maxplayers]);
		_player.call('localPlayers', [mp.players.toArray().length]);
	});

	player.call('sendItems', [items]);
});

const setupAccount = async (player: PlayerMp) => {
	let account = await Account.findOne({
		where: {
			scid: player.rgscId
		},
		relations: ['characters']
	});
	if (account === undefined) {
		account = Account.create({
			scid: player.rgscId
		});
		await account.save();
	}
	console.log(account);
	player.setOwnVariable('account', account);
};

export const loginChar = (player: PlayerMp, charId: number) => {
	const account = player.getOwnVariable('account');
	const char: Characters[] = account.characters.find((character: Characters) => character.id === charId);
	if (char === undefined) {
		player.outputChatBox(`${colors.error}[ERROR]${colors.white} invalid character id: ${colors.error}${charId}${colors.white}.`);
		return;
	}
	console.log(char);
	player.setOwnVariable('character', char);
	// console.log('Char: ', char.name);
};

export const getAccount = async (player: PlayerMp) => {
	return await Account.findOne({
		where: {
			scid: player.rgscId
		}
	});
};
