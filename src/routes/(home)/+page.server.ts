import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Collections } from '../../lib/pb_types';
import type { PostsResponse } from '../../lib/pb_types';

export const load = (async ({ locals }) => {
	const posts = await locals.pb
		.collection(Collections.Posts)
		.getList<PostsResponse>(1, 4, { expand: 'users', filter: 'type = 0' });
	const userAvatars = new Map();
	for (const post of posts.items) {
		// change type of post.expand to any
		const expand = post.expand as any;
		if (!expand.users) continue;
		console.log(expand);
		userAvatars.set(expand.users.id, locals.pb.getFileUrl(expand.users, expand.users.avatar));
	}
	return {
		user: locals.user,
		posts: structuredClone(posts),
		userAvatars: structuredClone(userAvatars)
	};
}) satisfies PageServerLoad;
