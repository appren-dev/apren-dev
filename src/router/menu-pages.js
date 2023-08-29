import React from "react";
export const Home = React.lazy(() => import("pages/home/Home.jsx"));

export const Elements = [
	{
		id: 1,
		Element: Home,
		route: "/home",
	},
];
