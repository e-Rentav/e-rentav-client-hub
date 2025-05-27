
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { ClientDashboard } from '@/components/client/ClientDashboard';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-erentav-primary to-erentav-secondary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  // Redirecionar baseado no role do usuário
  if (user.role === 'cliente') {
    return <ClientDashboard />;
  } else {
    return <Navigate to="/admin" replace />;
  }
};

export default Index;
