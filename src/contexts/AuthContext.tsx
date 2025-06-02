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

        // Verificar sessão existente com retry
        let sessionAttempts = 0;
        let currentSession = null;
        
        while (sessionAttempts < 3 && !currentSession) {
          try {
            const { data: { session: attemptSession }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) {
              console.error(`❌ Erro ao obter sessão (tentativa ${sessionAttempts + 1}):`, sessionError);
              if (sessionError.message.includes('Database error') || sessionError.message.includes('unexpected_failure')) {
                sessionAttempts++;
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
                continue;
              }
              break;
            }
            
            currentSession = attemptSession;
            break;
          } catch (error) {
            console.error(`❌ Erro inesperado na obtenção de sessão (tentativa ${sessionAttempts + 1}):`, error);
            sessionAttempts++;
            if (sessionAttempts < 3) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
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
      
      // Retry mechanism for profile fetch
      let profileAttempts = 0;
      let profile = null;
      
      while (profileAttempts < 3 && !profile) {
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (error) {
            if (error.code === 'PGRST116') {
              // Perfil não existe, criar um novo
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
                profileAttempts++;
                continue;
              }
              
              profile = createdProfile;
              break;
            } else {
              console.error(`❌ Erro ao buscar perfil (tentativa ${profileAttempts + 1}):`, error);
              profileAttempts++;
              if (profileAttempts < 3) {
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
              continue;
            }
          }
          
          profile = profileData;
          break;
        } catch (error) {
          console.error(`❌ Erro inesperado ao buscar perfil (tentativa ${profileAttempts + 1}):`, error);
          profileAttempts++;
          if (profileAttempts < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      if (profile) {
        console.log('✅ Perfil encontrado/criado:', profile);
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role as UserRole,
          status: profile.status,
          avatar: profile.avatar || undefined
        });
      } else {
        console.error('❌ Falha ao obter/criar perfil após múltiplas tentativas');
        toast.error('Erro ao carregar perfil do usuário');
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
      
      // Retry mechanism for login
      let loginAttempts = 0;
      let loginResult = null;
      
      while (loginAttempts < 3 && !loginResult) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password
          });

          if (error) {
            if (error.message.includes('Database error') || error.message.includes('unexpected_failure')) {
              console.error(`❌ Erro de banco (tentativa ${loginAttempts + 1}):`, error);
              loginAttempts++;
              if (loginAttempts < 3) {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
                continue;
              }
            }
            
            console.error('❌ Erro de login:', error);
            let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
            
            if (error.message.includes('Invalid login credentials')) {
              errorMessage = 'Email ou senha incorretos.';
            } else if (error.message.includes('Email not confirmed')) {
              errorMessage = 'Por favor, confirme seu email antes de fazer login.';
            } else if (error.message.includes('Too many requests')) {
              errorMessage = 'Muitas tentativas de login. Tente novamente em alguns minutos.';
            } else if (error.message.includes('Database error')) {
              errorMessage = 'Problema temporário no servidor. Tente novamente em alguns segundos.';
            }
            
            toast.error(errorMessage);
            setIsLoading(false);
            return { success: false, error: errorMessage };
          }

          loginResult = data;
          break;
        } catch (error) {
          console.error(`❌ Erro inesperado no login (tentativa ${loginAttempts + 1}):`, error);
          loginAttempts++;
          if (loginAttempts < 3) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }

      if (loginResult?.user) {
        console.log('✅ Login bem-sucedido para:', loginResult.user.email);
        toast.success('Login realizado com sucesso!');
        setIsLoading(false);
        return { success: true };
      } else {
        const errorMessage = 'Problema no servidor. Tente novamente em alguns minutos.';
        toast.error(errorMessage);
        setIsLoading(false);
        return { success: false, error: errorMessage };
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
