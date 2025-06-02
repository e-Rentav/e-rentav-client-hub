
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { ClientDashboard } from '@/components/client/ClientDashboard';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-erentav-primary to-erentav-secondary">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-white text-lg">Carregando sistema...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  // Redirecionar baseado no role do usuário
  switch (user.role) {
    case 'cliente':
      return <ClientDashboard />;
    case 'escritorio':
      return <Navigate to="/escritorio" replace />;
    case 'admin':
    case 'colaborador':
      return <Navigate to="/admin" replace />;
    default:
      return <ClientDashboard />;
  }
};

export default Index;
