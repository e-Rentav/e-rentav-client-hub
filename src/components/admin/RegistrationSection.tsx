
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PersonRegistrationForm } from './forms/PersonRegistrationForm';
import { OfficeRegistrationForm } from './forms/OfficeRegistrationForm';
import { CollaboratorRegistrationForm } from './forms/CollaboratorRegistrationForm';
import { User, Building2, UserPlus, ArrowLeft } from 'lucide-react';

type RegistrationType = 'menu' | 'person' | 'office' | 'collaborator';

export const RegistrationSection = () => {
  const [activeForm, setActiveForm] = useState<RegistrationType>('menu');

  const renderContent = () => {
    switch (activeForm) {
      case 'person':
        return <PersonRegistrationForm />;
      case 'office':
        return <OfficeRegistrationForm />;
      case 'collaborator':
        return <CollaboratorRegistrationForm />;
      default:
        return (
          <div className="max-w-4xl mx-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-erentav-primary"
                    onClick={() => setActiveForm('person')}
                  >
                    <CardContent className="p-6 text-center">
                      <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-lg font-semibold mb-2">Cliente Pessoa Física</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Cadastre um novo cliente pessoa física no sistema
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
                        Cadastre um escritório AAI ou de contabilidade (White Label)
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
                      <h3 className="text-lg font-semibold mb-2">Colaborador</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Cadastre um colaborador vinculado a um escritório
                      </p>
                      <Button className="w-full" variant="outline">
                        Cadastrar Colaborador
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
      {activeForm !== 'menu' && (
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
            {activeForm === 'collaborator' && 'Cadastro de Colaborador'}
          </h1>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};
