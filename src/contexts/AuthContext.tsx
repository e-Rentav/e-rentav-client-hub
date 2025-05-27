
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  parentOfficeId?: string; // Para clientes vinculados a escritórios
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
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  parentOfficeId?: string;
  documentsUploaded: number;
  joinDate: string;
  logo?: string;
  responsavel?: string;
  telefone?: string;
  clientsCount?: number; // Para escritórios
  planLimit?: number; // Limite de clientes para escritórios
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados mockados expandidos para os novos tipos
const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'admin@erentav.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'colaborador@erentav.com',
    role: 'colaborador',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'cliente@empresa.com',
    role: 'cliente',
    company: 'Tech Solutions Ltda',
    plan: 'Mensal',
    clientType: 'pessoa_fisica',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Escritório AAI Premium',
    email: 'admin@aaipremium.com',
    role: 'escritorio',
    company: 'AAI Premium Investimentos',
    plan: 'Profissional',
    clientType: 'escritorio_aai',
    cnpj: '12.345.678/0001-90',
    responsavel: 'Roberto Silva',
    telefone: '(11) 99999-9999',
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Contábil Excellence',
    email: 'contato@contabilexcellence.com',
    role: 'escritorio',
    company: 'Excellence Contabilidade',
    plan: 'Empresarial',
    clientType: 'escritorio_contabilidade',
    cnpj: '98.765.432/0001-12',
    responsavel: 'Ana Paula Costa',
    telefone: '(11) 88888-8888',
    avatar: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150&h=150&fit=crop&crop=face'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de token armazenado
    const storedUser = localStorage.getItem('erentav_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === '123456') { // Senha mockada
      setUser(foundUser);
      localStorage.setItem('erentav_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('erentav_user');
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
