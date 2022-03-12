import { Items } from '@/models';
import { SpawnPoints } from './spawn_points.json';

mp.events.add('playerDeath', (player) => {
	player.spawn(new mp.Vector3(SpawnPoints[Math.floor(Math.random() * SpawnPoints.length)]));
	player.health = 100;
});

mp.events.add('playerReady', (player) => {
	console.log(`${player.name} is ready!`);

	player.customProperty = 1;

	player.customMethod = () => {
		console.log('customMethod called.');
	};

	player.customMethod();
});

export let items: any;

export const getItems = async () => {
	items = await Items.find();
	return items;
};
