import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

//used for protecting admin routes
function AdminRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate path="/login" replace />
  );
}

export default AdminRoutes;
