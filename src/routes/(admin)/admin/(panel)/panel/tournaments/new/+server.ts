import { Collections } from '$lib/pb_types';
import type { RequestHandler } from './$types';
import type {
	PostsResponse,
	PostsRecord,
	TournamentsRecord
} from '../../../../../../../lib/pb_types';
import { json, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	// create empty post and redirect to it

	const tournaments = await event.locals.pb
		.collection(Collections.Tournaments)
		.create<TournamentsRecord>({
			name: 'Nowy tag',
			startDate: new Date().toISOString(),
			link: '',
			// random pastel color in hex r = 127-255, g = 127-255, b = 128-255
			color: `#${Math.floor(Math.random() * 128 + 127).toString(16)}${Math.floor(
				Math.random() * 128 + 127
			).toString(16)}${Math.floor(Math.random() * 128 + 128).toString(16)}`,
			endDate: new Date().toISOString()
		});

	return json(tournaments);
};
