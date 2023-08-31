import Login from "pages/auth/login/Login";
import ChangePassword from "pages/changePassword/ChangePassword";
import Home from "pages/home/Home";
import React from "react";

const authMenu = [
	{
		id: 1,
		route: "/authentication/login",
		Element: Login,
	},
];

const signedMenu = [
	
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
