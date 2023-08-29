import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Elements } from "./menu-pages";

export const AppRouter = () => {

	return (
		<Routes>
			{sessionStorage.getItem("token") ? (
				<Fragment>
					<Route path="/home" element={<Home />} />
					<Route element={<div>Layout</div>}>
						{Elements.map(({ id, route, Element }) => (
							<Route key={id} path={route} element={<Element />} />
						))}
					</Route>
				</Fragment>
			) : (
				<Route path="/login" element={<div>Login</div>} />
			)}
			<Route path="/" element={<Home />} />
			<Route path="*" element={<div>Error</div>} />
		</Routes>
	);
};
