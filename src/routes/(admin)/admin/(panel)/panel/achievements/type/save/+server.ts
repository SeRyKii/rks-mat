import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { AchievementsRecord } from '../../../../../../../../lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const types = await event.locals.pb
		.collection(Collections.AchievementTypes)
		.update<AchievementsRecord>(body.id, {
			emoji: body.emoji,
			color: body.color,
			title: body.title
		});

	const reponse = new Response(JSON.stringify(types), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
