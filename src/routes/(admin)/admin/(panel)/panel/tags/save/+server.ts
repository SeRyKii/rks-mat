import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { TagsRecord } from '../../../../../../../lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const tags = await event.locals.pb.collection(Collections.Tags).update<TagsRecord>(body.id, {
		name: body.name
	});

	const reponse = new Response(JSON.stringify(tags), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
