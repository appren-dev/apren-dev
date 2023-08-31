import { Routes, Route } from "react-router-dom";
import { signedMenu, unSingedMenu, authMenu } from "./menu-pages";
import MainLayout from "layout/MainLayout";
import AuthenticationLayout from "pages/auth/authLayout";

import ProtectedRoutes from "./ProtectedRoutes";

export const AppRouter = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				{unSingedMenu.map(({ id, route, Element }) => (
					<Route key={id} path={route} element={<Element />} />
				))}
				<Route element={<ProtectedRoutes />}>
					{signedMenu.map(({ id, route, Element }) => (
						<Route key={id} path={route} element={<Element />} />
					))}
				</Route>
			</Route>

			<Route path="/authentication" element={<AuthenticationLayout />}>
				{authMenu.map(({ id, route, Element }) => (
					<Route key={id} path={route} element={<Element />} />
				))}
			</Route>

			<Route path="*" element={<div>Error</div>} />
		</Routes>
	);
};
