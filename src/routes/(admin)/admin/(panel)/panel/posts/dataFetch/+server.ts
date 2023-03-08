import { Collections, type FilesResponse, type PostsResponse } from '$lib/pb_types';
import fetchMeta from 'fetch-meta-tags';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET = (async (event) => {
	const body = await event.request.url;

	const fetchurl = new URL(body).searchParams.get('url');

	const metadata = await fetchMeta(fetchurl);

	return json({
		success: 1,
		link: metadata.url,
		meta: {
			title: metadata.title,
			description: metadata.description,
			image: {
				url: metadata.image
			}
		}
	});
	// Get metadata from the url
}) satisfies RequestHandler;
