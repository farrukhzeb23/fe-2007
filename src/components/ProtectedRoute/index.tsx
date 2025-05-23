import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '../../stores/auth.store';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show nothing while checking authentication status
  if (isLoading) {
    return null; // Or you can return a loading spinner
  }

  // Redirect to home page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
}

export default ProtectedRoute;
