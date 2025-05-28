
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Plus, Settings, Tag, X } from 'lucide-react';

interface ServiceFormData {
  name: string;
  description: string;
}

const defaultServices = [
  { id: '1', name: 'Exterior', description: 'Declaração de bens e investimentos no exterior', active: true },
  { id: '2', name: 'Brasil', description: 'Declaração de bens e investimentos no Brasil', active: true },
  { id: '3', name: 'Criptos', description: 'Declaração de criptomoedas e ativos digitais', active: true },
  { id: '4', name: 'Declaração de IR', description: 'Declaração completa do Imposto de Renda', active: true }
];

export const ServicesManager = () => {
  const [services, setServices] = useState(defaultServices);
  const [showAddForm, setShowAddForm] = useState(false);
  const form = useForm<ServiceFormData>();

  const onSubmit = (data: ServiceFormData) => {
    const newService = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      active: true
    };
    
    setServices([...services, newService]);
    form.reset();
    setShowAddForm(false);
    
    toast({
      title: "Serviço adicionado!",
      description: `O serviço "${data.name}" foi cadastrado com sucesso.`,
    });
  };

  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, active: !service.active } : service
    ));
  };

  const removeService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Serviço removido",
      description: "O serviço foi removido da lista.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Serviços</h1>
        <p className="text-gray-600">Configure os serviços prestados aos clientes pessoa física</p>
      </div>

      <Card className="erentav-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Tag className="w-5 h-5 mr-2 text-erentav-primary" />
              Serviços Disponíveis
            </span>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="erentav-button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </CardTitle>
          <CardDescription>
            Serviços que podem ser associados aos clientes pessoa física
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <Card className="border-dashed">
              <CardContent className="p-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: 'Nome do serviço é obrigatório' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Serviço</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Exterior" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        rules={{ required: 'Descrição é obrigatória' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Input placeholder="Descrição do serviço" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="erentav-button">
                        Adicionar Serviço
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card key={service.id} className={`border-2 ${service.active ? 'border-green-200' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <Badge variant={service.active ? "default" : "secondary"}>
                          {service.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleService(service.id)}
                      >
                        <Settings className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeService(service.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
