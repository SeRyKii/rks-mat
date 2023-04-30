import type { PageServerLoad } from './$types';
import { Collections, type TournamentsResponse } from '$lib/pb_types';

export const load = (async ({ locals }) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	// first day of the month
	const firstDay = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
	// last day of the month
	const lastDay = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];

	const tournaments = await locals.pb
		.collection(Collections.Tournaments)
		// filter is like sql where make it startDate or endDate is between firstDay and lastDay
		// sometinhg like (startDate >= 'firstDay' && startDate <= 'lastDay') || (endDate >= firstDay && endDate <= lastDay)
		.getList<TournamentsResponse>(0, 100, {
			filter: `startDate >= '${firstDay}' && startDate <= '${lastDay}' || endDate >= '${firstDay}' && endDate <= '${lastDay}'`,
			sort: '+startDate'
		});

	return {
		user: locals.user,
		tournaments: structuredClone(tournaments)
	};
}) as PageServerLoad;
