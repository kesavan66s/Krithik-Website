import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  adminOnly?: boolean;
  params?: any;
}

export function PrivateRoute({ component: Component, adminOnly = false, params, ...rest }: PrivateRouteProps) {
  const [, setLocation] = useLocation();
  const { user, isAdmin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    } else if (adminOnly && !isAdmin) {
      setLocation("/");
    }
  }, [isAuthenticated, isAdmin, adminOnly, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  if (adminOnly && !isAdmin) {
    return null;
  }

  return <Component params={params} {...rest} />;
}
