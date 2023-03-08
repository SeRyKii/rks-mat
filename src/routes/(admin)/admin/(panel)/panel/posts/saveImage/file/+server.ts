import { Collections, type PostsResponse } from '$lib/pb_types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import type { PostsRecord } from '../../../../../../../../lib/pb_types';
import type { FilesResponse } from '../../../../../../../../lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.formData();

	const form = new FormData();
	form.append('file', (body.get('image') as Blob) || (body.get('file') as Blob));

	const record = await event.locals.pb.collection(Collections.Files).create<FilesResponse>(form);

	const url = event.locals.pb.getFileUrl(record, record.file || 'image');

	return json({
		success: 1,
		file: {
			url
		}
	});
}) satisfies RequestHandler;
