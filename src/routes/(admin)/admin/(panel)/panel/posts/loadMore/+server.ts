import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const posts = await event.locals.pb
		.collection(Collections.Posts)
		.getList<PostsResponse>(body.page, 5, {
			filter: body.filter,
			sort: '-created'
		});

	const reponse = new Response(JSON.stringify(posts), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
