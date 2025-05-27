
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Building2, Shield } from 'lucide-react';

interface CollaboratorFormData {
  name: string;
  cpf: string;
  email: string;
  officeId: string;
  permissions: {
    read: boolean;
    upload: boolean;
    manage: boolean;
  };
}

const mockOffices = [
  { id: '1', name: 'AAI Premium Investimentos' },
  { id: '2', name: 'Excellence Contabilidade' },
  { id: '3', name: 'Contábil Moderna' }
];

export const CollaboratorRegistrationForm = () => {
  const form = useForm<CollaboratorFormData>({
    defaultValues: {
      permissions: {
        read: true,
        upload: false,
        manage: false
      }
    }
  });

  const onSubmit = (data: CollaboratorFormData) => {
    console.log('Collaborator registration data:', data);
    toast({
      title: "Colaborador cadastrado com sucesso!",
      description: "O colaborador foi registrado e receberá um convite por e-mail.",
    });
    form.reset({
      permissions: {
        read: true,
        upload: false,
        manage: false
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle className="flex items-center text-erentav-primary">
            <UserPlus className="w-6 h-6 mr-3" />
            Cadastro de Colaborador
          </CardTitle>
          <CardDescription>
            Cadastre um novo colaborador vinculado a um escritório parceiro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Dados Pessoais */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
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
                      <FormLabel>E-mail (será usado como login)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="colaborador@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Escritório Vinculado */}
              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Escritório Vinculado
                </h3>
                <FormField
                  control={form.control}
                  name="officeId"
                  rules={{ required: 'Escritório é obrigatório' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escritório</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um escritório" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockOffices.map((office) => (
                            <SelectItem key={office.id} value={office.id}>
                              {office.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Permissões */}
              <div className="bg-green-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Permissões de Acesso
                </h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="permissions.read"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Leitura
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Visualizar dados dos clientes e documentos
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permissions.upload"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Upload de Documentos
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Fazer upload de documentos em nome dos clientes
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permissions.manage"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Gestão de Clientes
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Cadastrar e editar dados dos clientes do escritório
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancelar
                </Button>
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
