import { Collections } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { PostsResponse, PostsRecord } from '../../../../../../../lib/pb_types';
import { json, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	// create empty post and redirect to it
	const post = await event.locals.pb.collection(Collections.Posts).create<PostsResponse>({
		title: 'Nowy post',
		content: '{}',
		users: event.locals.user.id,
		type: 1
	});

	return json(post);
};
