
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { User, Phone, Mail, MapPin, Building2, Tag } from 'lucide-react';

interface ClientFormData {
  type: 'pf' | 'office';
  // Dados PF
  name?: string;
  cpf?: string;
  email: string;
  phone: string;
  // Dados Escritório
  cnpj?: string;
  razaoSocial?: string;
  responsavel?: string;
  cpfResponsavel?: string;
  emailResponsavel?: string;
  // Endereço (comum)
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  // Serviços (apenas PF)
  services?: string[];
}

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const availableServices = [
  { id: 'exterior', name: 'Exterior', description: 'Declaração de bens e investimentos no exterior' },
  { id: 'brasil', name: 'Brasil', description: 'Declaração de bens e investimentos no Brasil' },
  { id: 'criptos', name: 'Criptos', description: 'Declaração de criptomoedas e ativos digitais' },
  { id: 'declaracao-ir', name: 'Declaração de IR', description: 'Declaração completa do Imposto de Renda' }
];

interface CollaboratorClientRegistrationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CollaboratorClientRegistrationForm = ({ onSuccess, onCancel }: CollaboratorClientRegistrationFormProps) => {
  const form = useForm<ClientFormData>({
    defaultValues: {
      type: 'pf',
      services: []
    }
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const clientType = form.watch('type');

  const onSubmit = (data: ClientFormData) => {
    const formData = { ...data, services: clientType === 'pf' ? selectedServices : undefined };
    console.log('Collaborator client registration data:', formData);
    
    const clientTypeText = clientType === 'pf' ? 'pessoa física' : 'escritório';
    toast({
      title: "Cliente cadastrado com sucesso!",
      description: `O cliente ${clientTypeText} foi registrado e aguarda aprovação do administrador.`,
    });
    
    form.reset();
    setSelectedServices([]);
    onSuccess();
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <Card className="erentav-card max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-erentav-primary">
          <User className="w-6 h-6 mr-3" />
          Cadastro de Novo Cliente
        </CardTitle>
        <CardDescription>
          Cadastre um novo cliente no sistema e-Rentav
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Tipo de Cliente */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Tipo de Cliente</h3>
              <FormField
                control={form.control}
                name="type"
                rules={{ required: 'Tipo de cliente é obrigatório' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selecione o tipo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pf">Pessoa Física</SelectItem>
                        <SelectItem value="office">Escritório</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dados específicos por tipo */}
            {clientType === 'pf' ? (
              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: clientType === 'pf' ? 'Nome completo é obrigatório' : false }}
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
                    rules={{ required: clientType === 'pf' ? 'CPF é obrigatório' : false }}
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
            ) : (
              <div className="bg-green-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Dados do Escritório
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cnpj"
                    rules={{ required: clientType === 'office' ? 'CNPJ é obrigatório' : false }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input placeholder="00.000.000/0000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="razaoSocial"
                    rules={{ required: clientType === 'office' ? 'Razão Social é obrigatória' : false }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razão Social</FormLabel>
                        <FormControl>
                          <Input placeholder="Razão social da empresa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="responsavel"
                    rules={{ required: clientType === 'office' ? 'Nome do responsável é obrigatório' : false }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Responsável</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do responsável" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cpfResponsavel"
                    rules={{ required: clientType === 'office' ? 'CPF do responsável é obrigatório' : false }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF do Responsável</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Contato */}
            <div className="bg-purple-50 p-6 rounded-lg space-y-4">
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
                      <FormLabel>
                        {clientType === 'office' ? 'E-mail do Responsável' : 'E-mail'}
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@exemplo.com" {...field} />
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

            {/* Endereço Completo */}
            <div className="bg-orange-50 p-6 rounded-lg space-y-4">
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

            {/* Serviços Contratados - apenas para PF */}
            {clientType === 'pf' && (
              <div className="bg-indigo-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Serviços Contratados
                </h3>
                <p className="text-sm text-gray-600">Selecione os serviços que este cliente irá contratar</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableServices.map((service) => (
                    <div key={service.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-white">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <div className="flex-1">
                        <label htmlFor={service.id} className="font-medium text-gray-900 cursor-pointer">
                          {service.name}
                        </label>
                        <p className="text-xs text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
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
  );
};
