import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { AchievementsResponse } from '../../../../../../../lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const achievements = await event.locals.pb
		.collection(Collections.Achievements)
		.getList<AchievementsResponse>(body.page, 5, {
			filter: body.filter
		});

	const reponse = new Response(JSON.stringify(achievements), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
