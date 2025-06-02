
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export type UserRole = 'admin' | 'colaborador' | 'cliente' | 'escritorio';
export type ClientType = 'pessoa_fisica' | 'escritorio_aai' | 'escritorio_contabilidade';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  plan?: string;
  clientType?: ClientType;
  cnpj?: string;
  responsavel?: string;
  telefone?: string;
  logo?: string;
  parentOfficeId?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  type: ClientType;
  company?: string;
  cnpj?: string;
  cpf?: string;
  plan: string;
  status: 'ativo' | 'pendente' | 'inativo';
  parentOfficeId?: string;
  documentsUploaded: number;
  joinDate: string;
  logo?: string;
  responsavel?: string;
  telefone?: string;
  clientsCount?: number;
  planLimit?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      try {
        console.log('Verificando sessão existente...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao obter sessão:', error);
          setIsLoading(false);
          return;
        }
        
        console.log('Sessão obtida:', session?.user?.email || 'Nenhuma sessão');
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        }
      } catch (error) {
        console.error('Erro inesperado ao obter sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Mudança de estado de auth:', event, session?.user?.email || 'Usuário desconectado');
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('Usuário logou, buscando perfil...');
        await fetchUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        console.log('Usuário deslogou');
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      console.log('Buscando perfil para usuário:', authUser.email);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        
        // Se não encontrou perfil, tentar criar um baseado nos metadados
        if (error.code === 'PGRST116') {
          console.log('Perfil não encontrado, tentando criar...');
          const metaData = authUser.user_metadata || {};
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: authUser.id,
              name: metaData.name || authUser.email?.split('@')[0] || 'Usuário',
              email: authUser.email!,
              role: (metaData.role as UserRole) || 'cliente',
              status: 'ativo'
            })
            .select()
            .single();
            
          if (createError) {
            console.error('Erro ao criar perfil:', createError);
            return;
          }
          
          console.log('Perfil criado com sucesso:', newProfile);
          
          setUser({
            id: newProfile.id,
            name: newProfile.name,
            email: newProfile.email,
            role: newProfile.role as UserRole,
            avatar: newProfile.avatar || undefined
          });
        }
        return;
      }

      if (profile) {
        console.log('Perfil encontrado:', profile);
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role as UserRole,
          avatar: profile.avatar || undefined
        });
      }
    } catch (error) {
      console.error('Erro inesperado ao buscar perfil:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      console.log('Tentando fazer login com:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Erro de login:', error);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        console.log('Login bem-sucedido para:', data.user.email);
        await fetchUserProfile(data.user);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Erro inesperado no login:', error);
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = async () => {
    try {
      console.log('Fazendo logout...');
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
