import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Collections, type TournamentsResponse } from '../../lib/pb_types';
import type { AchievementsResponse, PostsResponse } from '../../lib/pb_types';

export const load = (async ({ locals }) => {
	const posts = await locals.pb
		.collection(Collections.Posts)
		.getList<PostsResponse>(1, 4, { expand: 'users, tags', filter: 'type = 0' });
	const userAvatars = new Map();
	for (const post of posts.items) {
		// change type of post.expand to any
		const expand = post.expand as any;
		if (!expand.users) continue;
		userAvatars.set(expand.users.id, locals.pb.getFileUrl(expand.users, expand.users.avatar));
	}
	const achievements = await locals.pb
		.collection(Collections.Achievements)
		.getList<AchievementsResponse>(1, 4, { sort: '-created' });

	const tournaments = await locals.pb
		.collection(Collections.Tournaments)
		.getList<TournamentsResponse>(1, 4, { sort: '-startDate' });

	return {
		user: locals.user,
		posts: structuredClone(posts),
		userAvatars: structuredClone(userAvatars),
		achievements: structuredClone(achievements),
		tournaments: structuredClone(tournaments)
	};
}) satisfies PageServerLoad;
