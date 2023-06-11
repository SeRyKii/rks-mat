import type { PageServerLoad } from './$types';
import {
	Collections,
	type PostsResponse,
	type TournamentsResponse
} from '$lib/pb_types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
	try {
		const tournaments = await locals.pb
			.collection(Collections.Tournaments)
			.getOne<TournamentsResponse>(params.slug);
		return {
			tournaments: structuredClone(tournaments)
		};
	} catch (err) {
		throw error(404);
	}
}) satisfies PageServerLoad;
