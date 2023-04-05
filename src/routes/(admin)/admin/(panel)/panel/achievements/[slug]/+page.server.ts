import type { PageServerLoad } from './$types';
import {
	Collections,
	type AchievementsResponse,
	type PostsResponse
} from '../../../../../../../lib/pb_types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
	try {
		const post = await locals.pb
			.collection(Collections.Achievements)
			.getOne<AchievementsResponse>(params.slug);
		return {
			post: structuredClone(post)
		};
	} catch (err) {
		throw error(404);
	}
}) satisfies PageServerLoad;
