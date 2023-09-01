import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
	const isLogged = sessionStorage.getItem("data");

	return <>{isLogged ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
