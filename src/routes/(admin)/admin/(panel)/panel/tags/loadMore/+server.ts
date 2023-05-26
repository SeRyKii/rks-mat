import { Collections, type TagsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const tags = await event.locals.pb
		.collection(Collections.Tags)
		.getList<TagsResponse>(body.page, 5, {
			filter: body.filter
		});

	const reponse = new Response(JSON.stringify(tags), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
