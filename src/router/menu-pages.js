import Confirmation from "pages/auth/register/confirmation/Confirmation";
import ChangePassword from "pages/changePassword/ChangePassword";
import ForgotPassword from "pages/forgotPassword/ForgotPassword";
import Register from "pages/auth/register/Register";
import Login from "pages/auth/login/Login";
import MyList from "pages/myList/MyList";
import Home from "pages/home/Home";
import { v4 } from "uuid";

const authMenu = [
	{
		id: v4(),
		route: "/authentication/login",
		Element: Login,
	},
	{
		id: v4(),
		route: "/authentication/forgot-password",
		Element: ForgotPassword,
	},
	{
		id: v4(),
		route: "/authentication/registration",
		Element: Register,
	},
	{
		id: v4(),
		route: "/authentication/confirmation",
		Element: Confirmation,
	},
];

const signedMenu = [
	{
		id: v4(),
		route: "/users/:id/current-user/change-password",
		Element: ChangePassword,
	},
];

const unSingedMenu = [
	{
		id: v4(),
		route: "/",
		Element: Home,
	},
	{
		id: v4(),
		route: "/my-list",
		Element: MyList,
	},
];

export { signedMenu, unSingedMenu, authMenu };
