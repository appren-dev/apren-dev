import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, signedMenu, unSingedMenu, authMenu } from "./menu-pages";
import MainLayout from "layout/MainLayout";
import AuthenticationLayout from "pages/auth/authLayout";

export const AppRouter = () => {

	return (
		<Routes>
			{sessionStorage.getItem("token") ? (
				<Fragment>
					<Route element={<MainLayout />}>
						{signedMenu.map(({ id, route, Element }) => (
							<Route key={id} path={route} element={<Element />} />
						))}
					</Route>
				</Fragment>
			) : (
				<Fragment>
					<Route element={<MainLayout />}>
						{unSingedMenu.map(({ id, route, Element }) => (
							<Route key={id} path={route} element={<Element />} />
						))}
					</Route>
				</Fragment>
			)}
			<Route path="/authentication" element={<AuthenticationLayout />}>
				{authMenu.map(({ id, route, Element }) => (
					<Route key={id} path={route} element={<Element />} />
				))}
			</Route>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<div>Error</div>} />
		</Routes>
	);
};
