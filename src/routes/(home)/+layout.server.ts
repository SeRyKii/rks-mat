import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		user: {
			...locals.user,
			avatarUrl: !locals.user ? '' : locals.pb.getFileUrl(locals.user, locals.user?.avatar)
		}
	};
}) as LayoutServerLoad;
