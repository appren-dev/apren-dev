import Login from "pages/auth/login/Login";
import Register from "pages/auth/register/Register";
import Confirmation from "pages/auth/register/confirmation/Confirmation";
import ChangePassword from "pages/changePassword/ChangePassword";
import CourseDetail from "pages/courseDetail/CourseDetail";
import ForgotPassword from "pages/forgotPassword/ForgotPassword";
import Home from "pages/home/Home";

const authMenu = [
	{
		id: 1,
		route: "/authentication/login",
		Element: Login,
	},
	{
		id: 2,
		route: "/authentication/forgot-password",
		Element: ForgotPassword ,
	},
	{
		id: 3,
		route: "/authentication/registration",
		Element: Register,
	},
	{
		id:4,
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
	{
		id: 1,
		route: "/courses/:courseName",
		Element: CourseDetail,
	},
];

export { signedMenu, unSingedMenu, authMenu };
