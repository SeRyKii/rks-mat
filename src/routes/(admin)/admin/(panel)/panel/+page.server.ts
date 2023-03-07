import type { PageServerLoad } from './$types';
import {
	Collections,
	type PostsCountResponse,
	type PostsDeletedResponse,
	type PostsDraftResponse,
	type PostsResponse
} from '../../../../../lib/pb_types';
import type { AnalyticsCountResponse, AnalyticsResponse } from '../../../../../lib/pb_types';

export const load = (async ({ locals }) => {
	const analyticsCount = await locals.pb
		.collection(Collections.AnalyticsCount)
		.getFirstListItem<AnalyticsCountResponse>('');
	const analyticsUniqueCount = await locals.pb
		.collection(Collections.AnalyticsUniqueCount)
		.getFirstListItem<AnalyticsCountResponse>('');

	// First 3 unfinished posts (active = false)
	const unfinishedPosts = await locals.pb
		.collection(Collections.Posts)
		.getList<PostsResponse>(1, 3, {
			filter: 'type = 1',
			sort: '-created'
		});

	const postsCount = await locals.pb
		.collection(Collections.PostsCount)
		.getFirstListItem<PostsCountResponse>('');

	const postsDraft = await locals.pb
		.collection(Collections.PostsDraft)
		.getFirstListItem<PostsDraftResponse>('');

	const postsDeleted = await locals.pb
		.collection(Collections.PostsDeleted)
		.getFirstListItem<PostsDeletedResponse>('');

	return {
		analyticsCount: structuredClone(analyticsCount),
		analyticsUniqueCount: structuredClone(analyticsUniqueCount),
		unfinishedPosts: structuredClone(unfinishedPosts),
		postsCount: structuredClone(postsCount),
		postsDraft: structuredClone(postsDraft),
		postsDeleted: structuredClone(postsDeleted)
	};
}) satisfies PageServerLoad;
