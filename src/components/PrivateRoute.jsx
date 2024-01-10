import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to="/user/login" replace />;
}

export const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo && userInfo.role === "admin" ? <Outlet /> : <Navigate to="/user/login" replace /> ;
}

export const DeliveryManRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo && userInfo.role === "deliveryman" ? <Outlet /> : <Navigate to="/user/login" replace /> ;
}

export default PrivateRoute