
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { User, UserRole, AuthContextType } from '@/types/auth';
import { 
  processAuthUser, 
  loginUser, 
  signUpUser, 
  resetUserPassword, 
  updateUserPassword, 
  updateUserProfile, 
  logoutUser 
} from '@/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔄 Inicializando autenticação...');

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erro ao obter sessão:', error);
          return;
        }

        console.log('📋 Sessão atual:', session?.user?.email || 'Nenhuma sessão');

        if (session?.user && mounted) {
          setSession(session);
          const userData = await processAuthUser(session.user);
          setUser(userData);
        }
      } catch (error) {
        console.error('❌ Erro crítico na inicialização:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('🔔 Mudança de estado auth:', event, currentSession?.user?.email || 'Desconectado');
      
      if (!mounted) return;

      if (event === 'SIGNED_IN' && currentSession?.user) {
        setSession(currentSession);
        const userData = await processAuthUser(currentSession.user);
        setUser(userData);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      } else if (event === 'TOKEN_REFRESHED' && currentSession) {
        setSession(currentSession);
        if (currentSession.user) {
          const userData = await processAuthUser(currentSession.user);
          setUser(userData);
        }
      }
    });

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const result = await loginUser(email, password);

      if (result?.user) {
        console.log('✅ Login bem-sucedido para:', result.user.email);
        toast.success('Login realizado com sucesso!');
        setIsLoading(false);
        return { success: true };
      } else {
        const errorMessage = 'Falha inesperada no login.';
        toast.error(errorMessage);
        setIsLoading(false);
        return { success: false, error: errorMessage };
      }
    } catch (error: any) {
      console.error('❌ Erro final no login:', error);
      const errorMessage = error.message || 'Erro inesperado. Tente novamente.';
      toast.error(errorMessage);
    }
    
    setIsLoading(false);
    return { success: false, error: 'Falha no login' };
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole = 'cliente'): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await signUpUser(email, password, name, role);

      if (error) {
        console.error('❌ Erro no cadastro:', error);
        let errorMessage = 'Erro ao criar conta.';
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'Este email já está cadastrado.';
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
        }
        
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      if (data.user) {
        console.log('✅ Usuário registrado:', data.user.email);
        toast.success('Conta criada com sucesso! Verifique seu email.');
        return { success: true };
      }

      return { success: false, error: 'Falha no cadastro' };
    } catch (error) {
      console.error('❌ Erro inesperado no cadastro:', error);
      const errorMessage = 'Erro inesperado no cadastro.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await resetUserPassword(email);

      if (error) {
        console.error('❌ Erro na recuperação:', error);
        const errorMessage = 'Erro ao enviar email de recuperação.';
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      console.log('✅ Email de recuperação enviado');
      toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.');
      return { success: true };
    } catch (error) {
      console.error('❌ Erro inesperado na recuperação:', error);
      const errorMessage = 'Erro inesperado na recuperação.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updatePassword = async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await updateUserPassword(password);

      if (error) {
        console.error('❌ Erro ao atualizar senha:', error);
        toast.error('Erro ao atualizar senha.');
        return { success: false, error: error.message };
      }

      toast.success('Senha atualizada com sucesso!');
      return { success: true };
    } catch (error) {
      console.error('❌ Erro inesperado ao atualizar senha:', error);
      const errorMessage = 'Erro inesperado ao atualizar senha.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    try {
      const { error } = await updateUserProfile(user.id, updates);

      if (error) {
        console.error('❌ Erro ao atualizar perfil:', error);
        toast.error('Erro ao atualizar perfil.');
        return { success: false, error: error.message };
      }

      setUser(prev => prev ? { ...prev, ...updates } : null);
      toast.success('Perfil atualizado com sucesso!');
      return { success: true };
    } catch (error) {
      console.error('❌ Erro inesperado ao atualizar perfil:', error);
      const errorMessage = 'Erro inesperado ao atualizar perfil.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await logoutUser();
      
      if (error) {
        console.error('❌ Erro no logout:', error);
        toast.error('Erro ao fazer logout.');
        return;
      }

      setUser(null);
      setSession(null);
      toast.success('Logout realizado com sucesso!');
      console.log('✅ Logout concluído');
    } catch (error) {
      console.error('❌ Erro inesperado no logout:', error);
      toast.error('Erro inesperado no logout.');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      login,
      logout,
      signUp,
      resetPassword,
      updatePassword,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
