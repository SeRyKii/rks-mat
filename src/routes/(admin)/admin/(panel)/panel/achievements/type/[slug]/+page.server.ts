import type { PageServerLoad } from './$types';
import { Collections, type AchievementTypesResponse, type PostsResponse } from '$lib/pb_types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
	try {
		const type = await locals.pb
			.collection(Collections.AchievementTypes)
			.getOne<AchievementTypesResponse>(params.slug);
		return {
			type: structuredClone(type)
		};
	} catch (err) {
		throw error(404);
	}
}) satisfies PageServerLoad;
