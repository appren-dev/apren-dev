import React from "react";
import { lang } from "lang/config";
export const Home = React.lazy(() => import("pages/home/Home.jsx"));

const noAuthMenu = [
	{
		id: 1,
		route: "/",
		Element: Home,
	},
];

const authMenu = [
	{
		id: 1,
		label: lang.plans,
		path: "/",
	},
];

export { noAuthMenu, authMenu };
