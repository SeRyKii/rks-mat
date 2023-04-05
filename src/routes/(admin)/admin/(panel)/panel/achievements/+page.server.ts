import type { PageServerLoad, Actions } from './$types';
import {
	Collections,
	type PostsResponse,
	type AchievementsResponse,
	type AchievementTypesResponse
} from '../../../../../../lib/pb_types';

export const load = (async ({ locals }) => {
	const achievements = await locals.pb
		.collection(Collections.Achievements)
		.getList<AchievementsResponse>(1, 5, {
			filter: ''
		});
	const achievementTypes = await locals.pb
		.collection(Collections.AchievementTypes)
		.getList<AchievementTypesResponse>(1, 5, {
			filter: ''
		});
	return {
		achievements: structuredClone(achievements),
		types: structuredClone(achievementTypes)
	};
}) satisfies PageServerLoad;
