import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ locals }) => {
	if (!locals.user) {
		throw redirect(307, '/admin/login');
	} else {
		throw redirect(307, '/admin/panel');
	}
}) satisfies PageServerLoad;
