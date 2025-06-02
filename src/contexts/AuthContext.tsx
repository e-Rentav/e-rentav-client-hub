
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

// Função utilitária para delay entre tentativas
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função utilitária para retry com backoff exponencial
const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      console.error(`❌ Tentativa ${attempt + 1}/${maxRetries} falhou:`, error);
      
      // Se é o último retry, não espera
      if (attempt === maxRetries - 1) break;
      
      // Backoff exponencial: 1s, 2s, 4s
      const waitTime = baseDelay * Math.pow(2, attempt);
      console.log(`⏳ Aguardando ${waitTime}ms antes da próxima tentativa...`);
      await delay(waitTime);
    }
  }
  
  throw lastError;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔄 Inicializando autenticação...');

        // Verificar sessão existente com retry robusto
        const currentSession = await retryWithBackoff(async () => {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('❌ Erro ao obter sessão:', error);
            throw error;
          }
          
          return session;
        });

        console.log('📋 Sessão atual:', currentSession?.user?.email || 'Nenhuma sessão');

        if (currentSession?.user && mounted) {
          setSession(currentSession);
          await processAuthUser(currentSession.user);
        }
      } catch (error) {
        console.error('❌ Erro crítico na inicialização:', error);
        // Em caso de erro crítico, ainda assim marca como não loading
        // para que o usuário possa tentar fazer login manualmente
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
        await processAuthUser(currentSession.user);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      } else if (event === 'TOKEN_REFRESHED' && currentSession) {
        setSession(currentSession);
        // Re-processar usuário para garantir que role ainda está correta
        if (currentSession.user) {
          await processAuthUser(currentSession.user);
        }
      }
    });

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const processAuthUser = async (authUser: SupabaseUser) => {
    try {
      console.log('👤 Processando usuário autenticado:', authUser.email);
      console.log('🔍 User metadata:', authUser.user_metadata);
      
      // Extrair role do user_metadata com fallback
      const roleFromMetadata = authUser.user_metadata?.role as UserRole;
      const defaultRole: UserRole = 'cliente';
      
      console.log('📝 Role do metadata:', roleFromMetadata);
      
      // Tentar buscar perfil no banco de dados com retry
      const profile = await fetchUserProfile(authUser);
      
      // Determinar a role final (priorizar metadata, depois profile, depois default)
      const finalRole = roleFromMetadata || profile?.role || defaultRole;
      
      console.log('✅ Role final determinada:', finalRole);
      
      // Criar objeto User com role mapeada corretamente
      const userData: User = {
        id: authUser.id,
        name: profile?.name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Usuário',
        email: authUser.email!,
        role: finalRole,
        status: profile?.status || 'ativo',
        avatar: profile?.avatar || authUser.user_metadata?.avatar || undefined,
        company: profile?.company,
        plan: profile?.plan,
        clientType: profile?.clientType,
        cnpj: profile?.cnpj,
        responsavel: profile?.responsavel,
        telefone: profile?.telefone,
        logo: profile?.logo,
        parentOfficeId: profile?.parentOfficeId
      };
      
      console.log('👤 Objeto User final:', userData);
      setUser(userData);
      
    } catch (error) {
      console.error('❌ Erro ao processar usuário:', error);
      toast.error('Erro ao carregar dados do usuário');
    }
  };

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      console.log('👤 Buscando perfil para:', authUser.email);
      
      // Buscar perfil com retry robusto
      const profile = await retryWithBackoff(async () => {
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
              throw createError;
            }
            
            return createdProfile;
          } else {
            console.error('❌ Erro ao buscar perfil:', error);
            throw error;
          }
        }
        
        return profileData;
      });

      if (profile) {
        console.log('✅ Perfil encontrado/criado:', profile);
        return profile;
      } else {
        console.error('❌ Falha ao obter/criar perfil');
        return null;
      }
    } catch (error) {
      console.error('❌ Erro inesperado ao buscar perfil:', error);
      // Em caso de erro, retornar null mas não bloquear o login
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      console.log('🔑 Tentando login para:', email);
      
      // Login com retry robusto
      const result = await retryWithBackoff(async () => {
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
          } else if (error.message.includes('Database error') || error.message.includes('unexpected_failure')) {
            errorMessage = 'Problema temporário no servidor. Tentando novamente...';
            throw error; // Força retry para erros de banco
          }
          
          throw new Error(errorMessage);
        }

        return data;
      });

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
