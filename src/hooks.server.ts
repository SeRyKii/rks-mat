import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { SECRET_POCKETBASE_URL } from '$env/static/private';
import { Collections, type AnalyticsRecord } from './lib/pb_types';

export const handle = (async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(SECRET_POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	// Uncomment to log analytics
	// event.locals.pb.collection(Collections.Analytics).create<AnalyticsRecord>({
	// 	user_agent: event.request.headers.get('user-agent'),
	// 	ip:
	// 		event.request.headers.get('x-forwarded-for') ||
	// 		event.request.headers.get('cf-connecting-ip') ||
	// 		event.request.headers.get('x-real-ip') ||
	// 		event.getClientAddress()
	// });

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = structuredClone(event.locals.pb.authStore.model);
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: true }));
	return response;
}) satisfies Handle;
