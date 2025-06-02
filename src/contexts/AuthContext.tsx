
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export type UserRole = 'admin' | 'colaborador' | 'cliente' | 'escritorio';
export type ClientType = 'pessoa_fisica' | 'escritorio_aai' | 'escritorio_contabilidade';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'ativo' | 'pendente' | 'inativo';
  company?: string;
  plan?: string;
  clientType?: ClientType;
  cnpj?: string;
  responsavel?: string;
  telefone?: string;
  logo?: string;
  parentOfficeId?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, name: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

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

        // Verificar sessão existente
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Erro ao obter sessão:', sessionError);
          if (mounted) {
            setIsLoading(false);
          }
          return;
        }

        console.log('📋 Sessão atual:', currentSession?.user?.email || 'Nenhuma sessão');

        if (currentSession?.user && mounted) {
          setSession(currentSession);
          await fetchUserProfile(currentSession.user);
        }
      } catch (error) {
        console.error('❌ Erro inesperado na inicialização:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Configurar listener de mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('🔔 Mudança de estado auth:', event, currentSession?.user?.email || 'Desconectado');
      
      if (!mounted) return;

      if (event === 'SIGNED_IN' && currentSession?.user) {
        setSession(currentSession);
        await fetchUserProfile(currentSession.user);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      } else if (event === 'TOKEN_REFRESHED' && currentSession) {
        setSession(currentSession);
      }
    });

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      console.log('👤 Buscando perfil para:', authUser.email);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('❌ Erro ao buscar perfil:', error);
        
        // Se perfil não existe, criar um novo
        if (error.code === 'PGRST116') {
          console.log('🔨 Criando novo perfil...');
          const metaData = authUser.user_metadata || {};
          
          const newProfile = {
            id: authUser.id,
            name: metaData.name || authUser.email?.split('@')[0] || 'Usuário',
            email: authUser.email!,
            role: (metaData.role as UserRole) || 'cliente',
            status: 'ativo' as const
          };

          const { data: createdProfile, error: createError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .single();
            
          if (createError) {
            console.error('❌ Erro ao criar perfil:', createError);
            toast.error('Erro ao criar perfil do usuário');
            return;
          }
          
          console.log('✅ Perfil criado:', createdProfile);
          setUser({
            id: createdProfile.id,
            name: createdProfile.name,
            email: createdProfile.email,
            role: createdProfile.role as UserRole,
            status: createdProfile.status,
            avatar: createdProfile.avatar || undefined
          });
        }
        return;
      }

      if (profile) {
        console.log('✅ Perfil encontrado:', profile);
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role as UserRole,
          status: profile.status,
          avatar: profile.avatar || undefined
        });
      }
    } catch (error) {
      console.error('❌ Erro inesperado ao buscar perfil:', error);
      toast.error('Erro ao carregar perfil do usuário');
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      console.log('🔑 Tentando login para:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        console.error('❌ Erro de login:', error);
        let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email ou senha incorretos.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Por favor, confirme seu email antes de fazer login.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Muitas tentativas de login. Tente novamente em alguns minutos.';
        }
        
        toast.error(errorMessage);
        setIsLoading(false);
        return { success: false, error: errorMessage };
      }

      if (data.user) {
        console.log('✅ Login bem-sucedido para:', data.user.email);
        toast.success('Login realizado com sucesso!');
        setIsLoading(false);
        return { success: true };
      }
    } catch (error) {
      console.error('❌ Erro inesperado no login:', error);
      const errorMessage = 'Erro inesperado. Tente novamente.';
      toast.error(errorMessage);
    }
    
    setIsLoading(false);
    return { success: false, error: 'Falha no login' };
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole = 'cliente'): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('📝 Registrando usuário:', { email, name, role });
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            role
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

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
      console.log('🔄 Enviando email de recuperação para:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

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
      const { error } = await supabase.auth.updateUser({ password });

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
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('❌ Erro ao atualizar perfil:', error);
        toast.error('Erro ao atualizar perfil.');
        return { success: false, error: error.message };
      }

      // Atualizar estado local
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
      console.log('👋 Fazendo logout...');
      const { error } = await supabase.auth.signOut();
      
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
