
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PersonRegistrationForm } from './forms/PersonRegistrationForm';
import { OfficeRegistrationFormComplete } from './forms/OfficeRegistrationFormComplete';
import { CollaboratorRegistrationForm } from './forms/CollaboratorRegistrationForm';
import { AdminCollaboratorRegistration } from './AdminCollaboratorRegistration';
import { ServicesManager } from './ServicesManager';
import { User, Building2, UserPlus, ArrowLeft, Tag, Shield } from 'lucide-react';

type RegistrationType = 'menu' | 'person' | 'office' | 'collaborator' | 'admin-collaborator' | 'services';

export const RegistrationSection = () => {
  const [activeForm, setActiveForm] = useState<RegistrationType>('menu');

  const renderContent = () => {
    switch (activeForm) {
      case 'person':
        return <PersonRegistrationForm />;
      case 'office':
        return <OfficeRegistrationFormComplete />;
      case 'collaborator':
        return <CollaboratorRegistrationForm />;
      case 'admin-collaborator':
        return <AdminCollaboratorRegistration onBack={() => setActiveForm('menu')} />;
      case 'services':
        return <ServicesManager />;
      default:
        return (
          <div className="max-w-5xl mx-auto">
            <Card className="erentav-card">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-erentav-primary">
                  Central de Cadastros e-Rentav
                </CardTitle>
                <CardDescription className="text-center">
                  Escolha o tipo de cadastro que deseja realizar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-erentav-primary"
                    onClick={() => setActiveForm('person')}
                  >
                    <CardContent className="p-6 text-center">
                      <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-lg font-semibold mb-2">Cliente Pessoa Física</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Cadastre um novo cliente pessoa física com endereço completo e serviços
                      </p>
                      <Button className="w-full" variant="outline">
                        Cadastrar PF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-erentav-primary"
                    onClick={() => setActiveForm('office')}
                  >
                    <CardContent className="p-6 text-center">
                      <Building2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
                      <h3 className="text-lg font-semibold mb-2">Escritório Parceiro</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Cadastre um escritório AAI ou de contabilidade com dados completos
                      </p>
                      <Button className="w-full" variant="outline">
                        Cadastrar Escritório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-erentav-primary"
                    onClick={() => setActiveForm('collaborator')}
                  >
                    <CardContent className="p-6 text-center">
                      <UserPlus className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                      <h3 className="text-lg font-semibold mb-2">Colaborador Escritório</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Cadastre um colaborador com endereço completo e permissões
                      </p>
                      <Button className="w-full" variant="outline">
                        Cadastrar Colaborador
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-erentav-primary"
                    onClick={() => setActiveForm('admin-collaborator')}
                  >
                    <CardContent className="p-6 text-center">
                      <Shield className="w-16 h-16 mx-auto mb-4 text-red-600" />
                      <h3 className="text-lg font-semibold mb-2">Colaborador Admin</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Cadastre um colaborador administrativo do sistema
                      </p>
                      <Button className="w-full" variant="outline">
                        Cadastrar Admin
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-erentav-primary"
                    onClick={() => setActiveForm('services')}
                  >
                    <CardContent className="p-6 text-center">
                      <Tag className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                      <h3 className="text-lg font-semibold mb-2">Gerenciar Serviços</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Configure os serviços prestados aos clientes pessoa física
                      </p>
                      <Button className="w-full" variant="outline">
                        Gerenciar Serviços
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {activeForm !== 'menu' && activeForm !== 'admin-collaborator' && (
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setActiveForm('menu')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Menu
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {activeForm === 'person' && 'Cadastro de Cliente Pessoa Física'}
            {activeForm === 'office' && 'Cadastro de Escritório Parceiro'}
            {activeForm === 'collaborator' && 'Cadastro de Colaborador de Escritório'}
            {activeForm === 'services' && 'Gerenciamento de Serviços'}
          </h1>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};
