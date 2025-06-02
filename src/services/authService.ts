
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User, UserRole } from '@/types/auth';
import { retryWithBackoff } from '@/utils/authUtils';
import { toast } from 'sonner';

export const fetchUserProfile = async (authUser: SupabaseUser): Promise<any> => {
  try {
    console.log('👤 Buscando perfil para:', authUser.email);
    
    const profile = await retryWithBackoff(async () => {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
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
    return null;
  }
};

export const processAuthUser = async (authUser: SupabaseUser): Promise<User> => {
  try {
    console.log('👤 Processando usuário autenticado:', authUser.email);
    console.log('🔍 User metadata:', authUser.user_metadata);
    
    const roleFromMetadata = authUser.user_metadata?.role as UserRole;
    const defaultRole: UserRole = 'cliente';
    
    console.log('📝 Role do metadata:', roleFromMetadata);
    
    const profile = await fetchUserProfile(authUser);
    
    const finalRole = roleFromMetadata || profile?.role || defaultRole;
    
    console.log('✅ Role final determinada:', finalRole);
    
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
    return userData;
    
  } catch (error) {
    console.error('❌ Erro ao processar usuário:', error);
    toast.error('Erro ao carregar dados do usuário');
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  console.log('🔑 Tentando login para:', email);
  
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
      } else if (error.message.includes('Database error') || 
                 error.message.includes('unexpected_failure') ||
                 error.message.includes('email_change')) {
        errorMessage = 'Problema temporário no servidor. Tentando novamente...';
        throw error;
      }
      
      throw new Error(errorMessage);
    }

    return data;
  });

  return result;
};

export const signUpUser = async (email: string, password: string, name: string, role: UserRole = 'cliente') => {
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

  return { data, error };
};

export const resetUserPassword = async (email: string) => {
  console.log('🔄 Enviando email de recuperação para:', email);
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });

  return { error };
};

export const updateUserPassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({ password });
  return { error };
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  return { error };
};

export const logoutUser = async () => {
  console.log('👋 Fazendo logout...');
  const { error } = await supabase.auth.signOut();
  return { error };
};
