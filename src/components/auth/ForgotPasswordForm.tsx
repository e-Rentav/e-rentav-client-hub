
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Building2, ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onSwitchToSignup: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onBackToLogin, 
  onSwitchToSignup 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { resetPassword } = useAuth();

  const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.') && email.trim().length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Email é obrigatório.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Digite um email válido.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword(email.trim());
      
      if (result.success) {
        setSuccess('Email de recuperação enviado! Verifique sua caixa de entrada e spam.');
        setEmail('');
      } else {
        setError(result.error || 'Erro ao enviar email de recuperação.');
      }
    } catch (err) {
      console.error('❌ Erro na recuperação de senha:', err);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-erentav-primary to-erentav-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-12 w-12 text-erentav-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Recuperar Senha</CardTitle>
          <CardDescription>
            Digite seu email para receber as instruções de recuperação
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <Mail className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                required
                disabled={isSubmitting}
                className="transition-all duration-200"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-erentav-primary hover:bg-erentav-primary/90 transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Email de Recuperação
                </>
              )}
            </Button>
            
            <div className="flex flex-col space-y-2 w-full">
              <Button
                type="button"
                variant="outline"
                className="w-full transition-all duration-200"
                onClick={onBackToLogin}
                disabled={isSubmitting}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Login
              </Button>
              
              <Button
                type="button"
                variant="link"
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={onSwitchToSignup}
                disabled={isSubmitting}
              >
                Não tem conta? Criar nova conta
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
