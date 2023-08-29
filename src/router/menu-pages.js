import React from "react";
export const Home = React.lazy(() => import("pages/home/Home.jsx"));
const Login = React.lazy(() => import("pages/auth/login/Login.jsx"));

const authMenu = [
	{
		id: 1,
		route: "/authentication/login",
		Element: Login,
	},
];

const signedMenu = [
	{
		id: 1,
		route: "/",
		Element: Home,
	},
];

const unSingedMenu = [
	{
		id: 1,
		route: "/",
		Element: Home,
	},
];

export { signedMenu, unSingedMenu, authMenu };
