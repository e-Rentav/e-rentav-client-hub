
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginForm } from "./components/auth/LoginForm";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ClientDashboard } from "./components/client/ClientDashboard";
import { OfficeDashboard } from "./components/office/OfficeDashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rota de login */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <LoginForm />
                </ProtectedRoute>
              } 
            />
            
            {/* Rota principal */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } 
            />
            
            {/* Rotas administrativas */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'colaborador']}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            />
            
            {/* Rota de cliente */}
            <Route 
              path="/cliente" 
              element={
                <ProtectedRoute allowedRoles={['cliente']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Rota de escritório */}
            <Route 
              path="/escritorio" 
              element={
                <ProtectedRoute allowedRoles={['escritorio']}>
                  <OfficeDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
