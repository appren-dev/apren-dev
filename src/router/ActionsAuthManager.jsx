import React from "react";
import { Navigate } from "react-router";

const ActionsAuthManager = () => {
	const forgotPassword = window.location.search.includes("mode=signIn");
	const confirmation = window.location.search.includes("mode=verifyEmail");
	let x = forgotPassword
		? `forgot-password${window.location.search}`
		: confirmation
		? `confirmation${window.location.search} `
		: "login";
	return <Navigate to={`/authentication/${x}`} />;
};

export default ActionsAuthManager;
