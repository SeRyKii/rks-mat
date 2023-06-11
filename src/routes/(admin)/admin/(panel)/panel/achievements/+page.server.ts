import type { PageServerLoad, Actions } from './$types';
import { Collections, type PostsResponse, type AchievementsResponse } from '$lib/pb_types';

export const load = (async ({ locals }) => {
	const achievements = await locals.pb
		.collection(Collections.Achievements)
		.getList<AchievementsResponse>(1, 5, {
			sort: '-created'
		});

	return {
		achievements: structuredClone(achievements)
	};
}) satisfies PageServerLoad;
