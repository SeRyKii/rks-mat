import { Collections, type PostsResponse } from '$lib/pb_types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const posts = await event.locals.pb.collection(Collections.Tags).delete(body.id);

	return json(posts);
}) satisfies RequestHandler;
