import React from "react";
export const Home = React.lazy(() => import("pages/home/Home.jsx"));
const Login = React.lazy(() => import("pages/auth/login/Login.jsx"));
const ChangePassword = React.lazy(() => import("pages/changePassword/ChangePassword.jsx"));

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
	{
		id: 2,
		route: "/users/:id/current-user/change-password",
		Element: ChangePassword,
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
