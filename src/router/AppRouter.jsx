import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, authMenu, noAuthMenu } from "./menu-pages";
import MainLayout from "layout/MainLayout";

export const AppRouter = () => {

	return (
		<Routes>
			{sessionStorage.getItem("token") ? (
				<Fragment>
					<Route element={<MainLayout />}>
						{authMenu.map(({ id, route, Element }) => (
							<Route key={id} path={route} element={<Element />} />
						))}
					</Route>
				</Fragment>
			) : (
				<Fragment>
					<Route element={<MainLayout />}>
						{noAuthMenu.map(({ id, route, Element }) => (
							<Route key={id} path={route} element={<Element />} />
						))}
					</Route>
				</Fragment>
			)}
			<Route path="/login" element={<div>Login</div>} />
			<Route path="/" element={<Home />} />
			<Route path="*" element={<div>Error</div>} />
		</Routes>
	);
};
