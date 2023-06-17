import type { PageServerLoad } from './$types';
import {
	Collections,
	type PhotosResponse,
	type PostsResponse,
	type TournamentsResponse
} from '$lib/pb_types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
	try {
		const tournaments = await locals.pb
			.collection(Collections.Tournaments)
			.getOne<TournamentsResponse>(params.slug);
		const photos = await locals.pb.collection(Collections.Photos).getList<PhotosResponse>(0, 32, {
			filter: `tournament = '${params.slug}'`,
			sort: '+created'
		});

		photos.items = photos.items.map((item) => {
			item.photo = locals.getFile('mpzr3s6p7kf0noq', item.id, item.photo as string);
			return item;
		});

		return {
			photos: structuredClone(photos),
			tournaments: structuredClone(tournaments)
		};
	} catch (err) {
		throw error(404);
	}
}) satisfies PageServerLoad;
