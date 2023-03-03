import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { SECRET_POCKETBASE_URL } from '$env/static/private';

export const handle = (async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(SECRET_POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

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
