import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Collections } from '../../lib/pb_types';
import type { PostsResponse } from '../../lib/pb_types';

export const load = (async ({ locals }) => {
	return {
		posts: structuredClone(
			await locals.pb.collection(Collections.Posts).getList<PostsResponse>(1, 50)
		).items
	};
}) satisfies PageServerLoad;
