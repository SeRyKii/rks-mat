import { Collections, type AchievementsRecord } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { PostsRecord } from '../../../../../../../lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const achievements = await event.locals.pb
		.collection(Collections.Achievements)
		.update<AchievementsRecord>(body.id, {
			description: body.description,
			post: body.post,
			color: body.color,
			emoji: body.emoji
		});

	const reponse = new Response(JSON.stringify(achievements), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
