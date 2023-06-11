import type { PageServerLoad } from './$types';
import { Collections, type PostsResponse, type TagsResponse } from '$lib/pb_types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
	try {
		const tags = await locals.pb.collection(Collections.Tags).getOne<TagsResponse>(params.slug);
		return {
			tags: structuredClone(tags)
		};
	} catch (err) {
		throw error(404);
	}
}) satisfies PageServerLoad;
