
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PersonRegistrationForm } from './forms/PersonRegistrationForm';

interface AdminClientRegistrationProps {
  onBack: () => void;
}

export const AdminClientRegistration = ({ onBack }: AdminClientRegistrationProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <img 
                  src="/lovable-uploads/75f6e7da-3f6e-4269-b1ea-f48bd08979b2.png" 
                  alt="e-Rentav Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-erentav-primary">
                  Cadastro de Cliente - Administrador
                </h1>
                <p className="text-sm text-gray-600">Adicione um novo cliente com permissões de administrador</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PersonRegistrationForm />
        <div className="max-w-4xl mx-auto mt-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-full"
          >
            Voltar aos Clientes
          </Button>
        </div>
      </div>
    </div>
  );
};
