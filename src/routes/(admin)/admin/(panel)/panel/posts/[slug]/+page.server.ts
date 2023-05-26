import type { PageServerLoad } from './$types';
import {
	Collections,
	type PostsResponse,
	type PostTagsResponse,
	type TagsRecord,
	type TagsResponse
} from '../../../../../../../lib/pb_types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
	try {
		const post = await locals.pb.collection(Collections.Posts).getOne<PostsResponse>(params.slug);
		const allTags = await locals.pb.collection(Collections.Tags).getFullList<TagsResponse>();
		const tags = await locals.pb
			.collection(Collections.PostTags)
			.getFullList<PostTagsResponse<{ tag: TagsResponse }>>({
				filter: "post = '" + post.id + "'",
				expand: 'tag'
			});
		const postTags = tags.map((tag) => tag.expand?.tag.name);

		return {
			post: structuredClone(post),
			tags: structuredClone(postTags),
			allTags: structuredClone(allTags)
		};
	} catch (err) {
		console.log(err);
		throw error(404);
	}
}) satisfies PageServerLoad;
