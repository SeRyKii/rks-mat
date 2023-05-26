import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const tournaments = await event.locals.pb
		.collection(Collections.Tournaments)
		.getList<PostsResponse>(body.page, 5, {
			filter: body.filter
		});

	const reponse = new Response(JSON.stringify(tournaments), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
