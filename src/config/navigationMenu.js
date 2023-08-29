import { lang } from "lang/config";
export const getNavItems = (session) => {
	console.log(session);

	const noAuthMenu = [
		{
			id: 1,
			label: lang.plans,
			path: "/academic/plans",
		},
		{
			id: 2,
			label: lang.courses,
			path: "/academic/courses",
		},
		{
			id: 3,
			label: lang.login,
			path: "/authentication/login",
		},
		{
			id: 4,
			label: lang.sign_up,
			path: "/authentication/registration",
		},
		{
			id: 5,
			label: lang.community,
			path: "/community",
		},
	];

	const authMenu = [
		{
			id: 1,
			label: lang.plans,
			path: "/academic/plans",
		},
		{
			id: 2,
			label: lang.courses,
			path: "/academic/courses",
		},
		{
			id: 3,
			label: lang.my_courses,
			path: "/authentication/registration",
		},
		{
			id: 4,
			label: lang.community,
			path: "/community",
		},
	];

	return session && session.status === "authenticated" ? [authMenu] : [noAuthMenu];
};
