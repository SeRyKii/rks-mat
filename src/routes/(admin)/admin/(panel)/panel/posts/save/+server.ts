import { Collections, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { PostTagsRecord, PostsRecord, TagsResponse } from '$lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.json();

	// Translate body.tags which contains tag names to tag ids in Collections.Tags collection
	if (body.tags) {
		const tagsConditions = body.tags.map((tag: string) => {
			return `name = "${tag}"`;
		});

		const filter = tagsConditions.join(' || ');
		const tags = await event.locals.pb.collection(Collections.Tags).getFullList<TagsResponse>({
			filter: filter
		});
		const postTags = await event.locals.pb
			.collection(Collections.PostTags)
			.getFullList<TagsResponse>({
				filter: `post = '${body.id}'`
			});

		postTags.forEach(async (tag) => {
			await event.locals.pb.collection(Collections.PostTags).delete(tag.id);
		});

		for (let i = 0; i < tags.length; i++) {
			setTimeout(async () => {
				await event.locals.pb.collection(Collections.PostTags).create<PostTagsRecord>({
					post: body.id,
					tag: tags[i].id
				});
			}, 100 + i * 100);
		}
	}

	const posts = await event.locals.pb.collection(Collections.Posts).update<PostsRecord>(body.id, {
		content: body.content,
		title: body.title,
		type: body.type
	});

	const reponse = new Response(JSON.stringify(posts), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
