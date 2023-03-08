import { Collections, type FilesResponse, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from '../$types';
import type { PostsRecord } from '../../../../../../../../lib/pb_types';
import { json } from '@sveltejs/kit';

export const POST = (async (event) => {
	const body = await event.request.json();

	const fetchurl = body.url;

	// download image and put it in formdata
	const form = new FormData();
	const response = await fetch(fetchurl);
	const blob = await response.blob();
	form.append('file', blob);

	// create file record
	const record = await event.locals.pb.collection(Collections.Files).create<FilesResponse>(form);

	// get url
	const url = event.locals.pb.getFileUrl(record, record.file || 'image');
	return json({
		success: 1,
		file: {
			url
		}
	});
}) satisfies RequestHandler;
