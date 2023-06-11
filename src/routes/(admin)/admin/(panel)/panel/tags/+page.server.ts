import type { PageServerLoad, Actions } from './$types';
import { Collections, type TagsResponse } from '$lib/pb_types';

export const load = (async ({ locals }) => {
	const tags = await locals.pb.collection(Collections.Tags).getList<TagsResponse>(1, 5, {
		sort: '-created',
		filter: ''
	});

	return {
		tags: structuredClone(tags)
	};
}) satisfies PageServerLoad;
