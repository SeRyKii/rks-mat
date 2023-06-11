import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { PostsRecord, TournamentsRecord } from '$lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.json();
	const tournaments = await event.locals.pb
		.collection(Collections.Tournaments)
		.update<TournamentsRecord>(body.id, {
			name: body.name,
			startDate: body.startDate,
			link: body.link,
			color: body.color,
			endDate: body.endDate
		});

	const reponse = new Response(JSON.stringify(tournaments), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
