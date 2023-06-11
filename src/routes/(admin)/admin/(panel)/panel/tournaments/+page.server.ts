import type { PageServerLoad, Actions } from './$types';
import {
	Collections,
	type PostsResponse,
	type TournamentsResponse
} from '$lib/pb_types';

export const load = (async ({ locals }) => {
	const tournaments = await locals.pb
		.collection(Collections.Tournaments)
		.getList<TournamentsResponse>(1, 5, {
			sort: '-startDate',
			filter: ''
		});

	return {
		tournaments: structuredClone(tournaments)
	};
}) satisfies PageServerLoad;
