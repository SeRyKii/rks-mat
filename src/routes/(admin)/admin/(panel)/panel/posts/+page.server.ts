import type { PageServerLoad, Actions } from './$types';
import { Collections, type PostsResponse } from '$lib/pb_types';

export const load = (async ({ locals }) => {
	const posts = await locals.pb.collection(Collections.Posts).getList<PostsResponse>(1, 5, {
		filter: '',
		sort: '-created'
	});

	return {
		posts: structuredClone(posts)
	};
}) satisfies PageServerLoad;
