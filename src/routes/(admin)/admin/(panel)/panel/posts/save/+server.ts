import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { PostsRecord } from '../../../../../../../lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const posts = await event.locals.pb
		.collection(Collections.Posts)
		.update<PostsRecord>(body.id, { content: body.content });

	const reponse = new Response(JSON.stringify(posts), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
