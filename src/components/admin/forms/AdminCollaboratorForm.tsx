
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Mail, Phone, Building, DollarSign, User } from 'lucide-react';

interface AdminCollaboratorFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  salary: string;
}

const departments = [
  'Recursos Humanos',
  'Tecnologia da Informação',
  'Financeiro',
  'Comercial/Vendas',
  'Marketing',
  'Operações',
  'Jurídico',
  'Atendimento ao Cliente',
  'Administrativo',
  'Diretoria'
];

export const AdminCollaboratorForm = () => {
  const form = useForm<AdminCollaboratorFormData>();

  const onSubmit = (data: AdminCollaboratorFormData) => {
    console.log('Admin collaborator registration data:', data);
    toast({
      title: "Colaborador cadastrado com sucesso!",
      description: "O colaborador foi registrado e receberá credenciais de acesso por e-mail.",
    });
    form.reset();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle className="flex items-center text-erentav-primary">
            <UserPlus className="w-6 h-6 mr-3" />
            Cadastro de Colaborador Administrativo
          </CardTitle>
          <CardDescription>
            Cadastre um novo colaborador para acesso ao sistema administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Nome completo é obrigatório' }}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
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
                    name="email"
                    rules={{ 
                      required: 'E-mail corporativo é obrigatório',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'E-mail inválido'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail Corporativo</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              type="email" 
                              placeholder="colaborador@erentav.com" 
                              className="pl-10"
                              {...field} 
                            />
                          </div>
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
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="(11) 99999-9999" 
                              className="pl-10"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Dados Profissionais */}
              <div className="bg-green-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Informações Profissionais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department"
                    rules={{ required: 'Setor é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setor</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o setor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salary"
                    rules={{ required: 'Salário é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salário</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
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
