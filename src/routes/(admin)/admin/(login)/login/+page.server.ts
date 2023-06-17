import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	login: async (event) => {
		const body = await event.request.formData();
		try {
			await event.locals.pb
				.collection('users')
				.authWithPassword(
					body.get('email')?.toString() || '',
					body.get('password')?.toString() || ''
				);
		} catch (err) {
			throw error(400, 'Invalid email or password');
		}

		throw redirect(303, '/admin/panel');
	}
} satisfies Actions;
