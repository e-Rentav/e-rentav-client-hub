
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter,
  Download,
  Eye,
  FileText,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const DocumentsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      id: 1,
      name: 'relatorio_novembro.pdf',
      client: 'Tech Solutions Ltda',
      clientEmail: 'carlos@empresa.com',
      uploadDate: '28/12/2024',
      status: 'Processado',
      size: '2.4 MB',
      type: 'PDF',
      processedBy: 'Maria Santos'
    },
    {
      id: 2,
      name: 'planilha_vendas.xlsx',
      client: 'Inovação Digital',
      clientEmail: 'ana@inovacao.com',
      uploadDate: '27/12/2024',
      status: 'Em análise',
      size: '1.8 MB',
      type: 'Excel',
      processedBy: null
    },
    {
      id: 3,
      name: 'backup_sistema.csv',
      client: 'StartUp ABC',
      clientEmail: 'roberto@startup.com',
      uploadDate: '26/12/2024',
      status: 'Pendente',
      size: '892 KB',
      type: 'CSV',
      processedBy: null
    },
    {
      id: 4,
      name: 'contrato_dezembro.pdf',
      client: 'Tech Solutions Ltda',
      clientEmail: 'carlos@empresa.com',
      uploadDate: '25/12/2024',
      status: 'Processado',
      size: '3.1 MB',
      type: 'PDF',
      processedBy: 'João Silva'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processado':
        return 'default';
      case 'Em análise':
        return 'secondary';
      case 'Pendente':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processado':
        return <CheckCircle className="w-4 h-4" />;
      case 'Em análise':
        return <Clock className="w-4 h-4" />;
      case 'Pendente':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    total: documents.length,
    processado: documents.filter(d => d.status === 'Processado').length,
    analise: documents.filter(d => d.status === 'Em análise').length,
    pendente: documents.filter(d => d.status === 'Pendente').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documentos</h1>
        <p className="text-gray-600">Gerencie todos os documentos enviados pelos clientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-erentav-primary">{statusCounts.total}</p>
              </div>
              <FileText className="w-8 h-8 text-erentav-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processados</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.processado}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Análise</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.analise}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">{statusCounts.pendente}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="erentav-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome do arquivo, cliente ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle>Lista de Documentos</CardTitle>
          <CardDescription>
            {filteredDocuments.length} documentos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-erentav-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-erentav-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{document.name}</h3>
                        <Badge 
                          variant={getStatusColor(document.status)}
                          className="flex items-center space-x-1"
                        >
                          {getStatusIcon(document.status)}
                          <span>{document.status}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {document.type}
                        </Badge>
                      </div>
                      
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          {document.client} ({document.clientEmail})
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {document.uploadDate}
                          </div>
                          <div>
                            Tamanho: {document.size}
                          </div>
                          {document.processedBy && (
                            <div>
                              Processado por: {document.processedBy}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Visualizar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
