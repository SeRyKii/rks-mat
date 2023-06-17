import { Collections, type PhotosRecord, type PostsResponse } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type { PostsRecord, TournamentsRecord } from '$lib/pb_types';

export const POST = (async (event) => {
	const body = await event.request.formData();

	const tournaments = await event.locals.pb
		.collection(Collections.Tournaments)
		.update<TournamentsRecord>(body.get('id') as string, {
			name: body.get('name'),
			startDate: body.get('startDate'),
			link: body.get('link'),
			color: body.get('color'),
			endDate: body.get('endDate')
		});
	for (const file of body.getAll('files')) {
		const form = new FormData();
		form.append('photo', file);
		form.append('tournament', body.get('id') as string);
		await event.locals.pb.collection(Collections.Photos).create<PhotosRecord>(form);
	}

	for (const file of body.getAll('filesForDelete')) {
		const id = await event.locals.pb.collection(Collections.Photos).getList<PostsResponse>(0, 1, {
			filter: `photo = '${(file as string).split('?')[0]}'`
		});

		if (id.items.length > 0) {
			await event.locals.pb.collection(Collections.Photos).delete(id.items[0].id as string);
		}
	}
	const reponse = new Response(JSON.stringify(tournaments), {
		status: 200
	});

	return reponse;
}) satisfies RequestHandler;
