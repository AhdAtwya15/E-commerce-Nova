// AdminRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import type { ReactNode } from "react";
import type { RootState } from "../../app/store";
import { useGetUserDataQuery } from "../../app/Features/loggedUserApi";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  const { data: userData } = useGetUserDataQuery(token || '', { skip: !token });
  const role = userData?.data?.role;

  if (!token || role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
