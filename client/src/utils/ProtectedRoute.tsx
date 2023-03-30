import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
interface Props {
	children: React.ReactNode;
}
const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const { isAuthenticated } = useContext(AuthContext);

	return isAuthenticated ? <>{children}</> : <Navigate to="login" />;
};
export default ProtectedRoute;
