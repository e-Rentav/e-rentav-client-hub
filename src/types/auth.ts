
import { Session } from '@supabase/supabase-js';

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

export interface AuthContextType {
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
