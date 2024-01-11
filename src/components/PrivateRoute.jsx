import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../redux/features/userApiSlice";

const PrivateRoute = () => {
    const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });
    return data ? <Outlet /> : <Navigate to="/user/login" replace />;
}

export const AdminRoute = () => {
    const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });
    return data && data?.role === "admin" ? <Outlet /> : <Navigate to="/user/login" replace /> ;
}

export const DeliveryManRoute = () => {
    const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });
    return data && data?.role === "deliveryman" ? <Outlet /> : <Navigate to="/user/login" replace /> ;
}

export const SuperAdminRoute = () => {
    const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });
    return data && data?.role === "superadmin" ? <Outlet /> : <Navigate to="/user/login" replace /> ;
}

export default PrivateRoute