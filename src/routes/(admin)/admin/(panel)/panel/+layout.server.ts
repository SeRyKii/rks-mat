import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
	if (!locals.user) {
		throw redirect(307, '/admin/login');
	}

	return {
		user: {
			...locals.user,
			avatarUrl: locals.pb.getFileUrl(locals.user, locals.user.avatar)
		}
	};
}) satisfies LayoutServerLoad;
