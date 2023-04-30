import { Collections, type TournamentsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const body = await event.request.json();
	// Construct date using body.year and body.month
	// first day of the month
	const firstDay = new Date(body.year, body.month, 1).toISOString().split('T')[0];
	// last day of the month
	const lastDay = new Date(body.year, body.month + 1, 0).toISOString().split('T')[0];

	const posts = await event.locals.pb
		.collection(Collections.Tournaments)
		.getList<TournamentsResponse>(0, 100, {
			filter: `startDate >= '${firstDay}' && startDate <= '${lastDay}' || endDate >= '${firstDay}' && endDate <= '${lastDay}'`,
			sort: '+startDate'
		});

	const reponse = new Response(JSON.stringify(posts), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
