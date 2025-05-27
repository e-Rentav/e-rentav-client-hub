
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { User, Phone, Mail, MapPin, Building2 } from 'lucide-react';

interface PersonFormData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  linkedOfficeId?: string;
}

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const mockOffices = [
  { id: '1', name: 'AAI Premium Investimentos', type: 'aai' },
  { id: '2', name: 'Excellence Contabilidade', type: 'contabilidade' }
];

export const PersonRegistrationForm = () => {
  const form = useForm<PersonFormData>();

  const onSubmit = (data: PersonFormData) => {
    console.log('Person registration data:', data);
    toast({
      title: "Cliente cadastrado com sucesso!",
      description: "O cliente pessoa física foi registrado no sistema.",
    });
    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle className="flex items-center text-erentav-primary">
            <User className="w-6 h-6 mr-3" />
            Cadastro de Cliente Pessoa Física
          </CardTitle>
          <CardDescription>
            Cadastre um novo cliente pessoa física no sistema e-Rentav
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          <Input placeholder="Nome completo do cliente" {...field} />
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
                  <Phone className="w-5 h-5 mr-2" />
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
                          <Input type="email" placeholder="cliente@email.com" {...field} />
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

              {/* Endereço */}
              <div className="bg-green-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Endereço Completo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="street"
                      rules={{ required: 'Rua é obrigatória' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rua</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da rua" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="number"
                    rules={{ required: 'Número é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt, Bloco, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    rules={{ required: 'Bairro é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do bairro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    rules={{ required: 'Cidade é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    rules={{ required: 'Estado é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado (UF)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brazilianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
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
                    name="cep"
                    rules={{ required: 'CEP é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Escritório Vinculado */}
              <div className="bg-purple-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Vínculo com Escritório (Opcional)
                </h3>
                <FormField
                  control={form.control}
                  name="linkedOfficeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escritório Parceiro</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um escritório ou deixe vazio para cliente direto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockOffices.map((office) => (
                            <SelectItem key={office.id} value={office.id}>
                              {office.name} ({office.type === 'aai' ? 'AAI' : 'Contabilidade'})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancelar
                </Button>
                <Button type="submit" className="erentav-button">
                  Cadastrar Cliente
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
