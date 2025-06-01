
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { UserPlus, User, Mail, Phone, FileText } from 'lucide-react';

interface OfficeCollaboratorFormData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface OfficeCollaboratorFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const OfficeCollaboratorForm: React.FC<OfficeCollaboratorFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const form = useForm<OfficeCollaboratorFormData>();

  const onSubmit = (data: OfficeCollaboratorFormData) => {
    console.log('Office collaborator registration data:', data);
    toast({
      title: "Colaborador cadastrado com sucesso!",
      description: "O colaborador foi registrado e receberá um convite por e-mail.",
    });
    form.reset();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle className="flex items-center text-erentav-primary">
            <UserPlus className="w-6 h-6 mr-3" />
            Cadastro de Colaborador
          </CardTitle>
          <CardDescription>
            Cadastre um novo colaborador para o seu escritório
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Nome completo é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo do colaborador" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cpf"
                    rules={{ required: 'CPF é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contato */}
              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Informações de Contato
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: 'E-mail é obrigatório',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'E-mail inválido'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="colaborador@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    rules={{ required: 'Telefone é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                  </Button>
                )}
                <Button type="submit" className="erentav-button">
                  Cadastrar Colaborador
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
