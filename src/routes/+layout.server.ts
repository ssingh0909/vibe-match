import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const userEmail = cookies.get('userEmail');
	return {
		userEmail
	};
};
