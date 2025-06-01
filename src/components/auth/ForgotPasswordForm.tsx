
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, ArrowLeft, Key, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onSwitchToSignup: () => void;
}

export const ForgotPasswordForm = ({ onBackToLogin, onSwitchToSignup }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, digite seu email.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        console.error('Reset password error:', error);
        toast({
          title: "Erro ao enviar email",
          description: error.message || "Ocorreu um erro ao enviar o email de recuperação.",
          variant: "destructive"
        });
        return;
      }

      setEmailSent(true);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para recuperar sua senha.",
        variant: "default"
      });
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <p className="text-white/80">Recuperar Senha</p>
        </div>

        {/* Formulário de recuperação de senha */}
        <Card className="erentav-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {emailSent ? 'Email Enviado!' : 'Esqueci minha Senha'}
            </CardTitle>
            <CardDescription className="text-center">
              {emailSent 
                ? 'Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.'
                : 'Digite seu email para receber as instruções de recuperação de senha.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
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

                <Button
                  type="submit"
                  className="w-full erentav-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Key className="mr-2 h-4 w-4" />
                      Enviar Email de Recuperação
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Um email com as instruções foi enviado para <strong>{email}</strong>
                </p>
                <p className="text-xs text-gray-500">
                  Não esqueça de verificar sua pasta de spam.
                </p>
              </div>
            )}

            {/* Links para outras ações */}
            <div className="mt-6 space-y-2">
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={onBackToLogin}
                  className="w-full"
                  disabled={isLoading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Login
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={onSwitchToSignup}
                  className="w-full text-sm"
                  disabled={isLoading}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Criar nova conta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
