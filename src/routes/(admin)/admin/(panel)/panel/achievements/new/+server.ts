import { Collections } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { PostsResponse, PostsRecord, AchievementsRecord } from '$lib/pb_types';
import { json, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	// create empty post and redirect to it
	const post = await event.locals.pb.collection(Collections.Posts).create<AchievementsRecord>({
		title: 'Nowe Osiągnięcie',
		content: undefined,
		users: undefined,
		type: undefined
	});

	return json(post);
};
