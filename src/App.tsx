
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginForm } from "./components/auth/LoginForm";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ClientDashboard } from "./components/client/ClientDashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-erentav-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" replace />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          {user?.role === 'cliente' ? (
            <ClientDashboard />
          ) : (
            <Navigate to="/admin" replace />
          )}
        </ProtectedRoute>
      } />
      
      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['admin', 'colaborador']}>
          <AdminLayout />
        </ProtectedRoute>
      } />
      
      <Route path="/cliente" element={
        <ProtectedRoute allowedRoles={['cliente']}>
          <ClientDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
