import type { PageServerLoad } from './$types';
import { Collections, type AchievementsResponse, type PostsResponse } from '$lib/pb_types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
	try {
		const achievement = await locals.pb
			.collection(Collections.Achievements)
			.getOne<AchievementsResponse>(params.slug);
		const posts = await locals.pb
			.collection(Collections.Posts)
			.getList<PostsResponse>(1, 10, { sort: '-created' });

		let connectedPost = null;
		if (achievement.post && posts.items.filter((v) => v.id === achievement.post).length === 0) {
			connectedPost = await locals.pb
				.collection(Collections.Posts)
				.getOne<PostsResponse>(achievement.post);
		}
		return {
			achievement: structuredClone(achievement),
			posts: structuredClone(posts),
			connectedPost: structuredClone(connectedPost)
		};
	} catch (err) {
		throw error(404);
	}
}) satisfies PageServerLoad;
