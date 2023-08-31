import Login from "pages/auth/login/Login";
import Register from "pages/auth/register/Register";
import Confirmation from "pages/auth/register/confirmation/Confirmation";
import ChangePassword from "pages/changePassword/ChangePassword";
import Home from "pages/home/Home";

const authMenu = [
	{
		id: 1,
		route: "/authentication/login",
		Element: Login,
	},
	{
		id: 2,
		route: "/authentication/registration",
		Element: Register,
	},
	{
		id:3,
		route:"/authentication/confirmation",
		Element: Confirmation,
	
	}
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
