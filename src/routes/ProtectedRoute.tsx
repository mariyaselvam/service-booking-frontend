import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
