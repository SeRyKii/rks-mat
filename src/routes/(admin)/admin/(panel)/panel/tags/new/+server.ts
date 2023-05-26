import { Collections } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { TagsRecord } from '../../../../../../../lib/pb_types';
import { json, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	// create empty post and redirect to it

	const tags = await event.locals.pb.collection(Collections.Tags).create<TagsRecord>({
		name: 'Nowy tag'
	});

	return json(tags);
};
