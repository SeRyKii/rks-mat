import { Collections } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { PostsResponse, PostsRecord, AchievementsRecord } from '$lib/pb_types';
import { json, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	// create empty post and redirect to it
	const post = await event.locals.pb
		.collection(Collections.Achievements)
		.create<AchievementsRecord>({
			description: 'Nowe Osiągnięcie',
			post: undefined,
			color: '#000000',
			emoji: '🏆'
		});

	return json(post);
};
