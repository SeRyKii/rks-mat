import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { AchievementsResponse, AchievementTypesResponse } from '$lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const achievementTypes = await event.locals.pb
		.collection(Collections.AchievementTypes)
		.getList<AchievementTypesResponse>(body.page, 5, {
			filter: body.filter
		});

	const reponse = new Response(JSON.stringify(achievementTypes), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
