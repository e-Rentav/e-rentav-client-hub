
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, UserPlus, Key } from 'lucide-react';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

type AuthMode = 'login' | 'signup' | 'forgot-password';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password);
    
    if (!success) {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive"
      });
    }
  };

  const demoCredentials = [
    { role: 'Administrador', email: 'admin@erentav.com', password: '123456' },
    { role: 'Colaborador', email: 'colaborador@erentav.com', password: '123456' },
    { role: 'Cliente PF', email: 'cliente@empresa.com', password: '123456' },
    { role: 'Escritório AAI', email: 'admin@aaipremium.com', password: '123456' },
    { role: 'Escritório Contábil', email: 'contato@contabilexcellence.com', password: '123456' }
  ];

  if (authMode === 'signup') {
    return (
      <SignupForm 
        onBackToLogin={() => setAuthMode('login')}
        onSwitchToForgotPassword={() => setAuthMode('forgot-password')}
      />
    );
  }

  if (authMode === 'forgot-password') {
    return (
      <ForgotPasswordForm 
        onBackToLogin={() => setAuthMode('login')}
        onSwitchToSignup={() => setAuthMode('signup')}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-erentav-gradient p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e branding */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <img 
              src="/lovable-uploads/75f6e7da-3f6e-4269-b1ea-f48bd08979b2.png" 
              alt="e-Rentav Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">e-Rentav</h1>
          <p className="text-white/80">Sistema de Gestão de Clientes e Documentos</p>
        </div>

        {/* Formulário de login */}
        <Card className="erentav-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full erentav-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            {/* Links para outras ações */}
            <div className="mt-6 space-y-2">
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => setAuthMode('signup')}
                  className="w-full"
                  disabled={isLoading}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Criar Conta
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => setAuthMode('forgot-password')}
                  className="w-full text-sm"
                  disabled={isLoading}
                >
                  <Key className="mr-2 h-4 w-4" />
                  Esqueci minha senha
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credenciais de demonstração */}
        <Card className="erentav-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Credenciais de Demonstração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="text-xs space-y-1 p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-erentav-primary">{cred.role}</div>
                <div>Email: {cred.email}</div>
                <div>Senha: {cred.password}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
