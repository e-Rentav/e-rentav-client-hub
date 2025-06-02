
export type ClientType = 'pessoa_fisica' | 'escritorio_aai' | 'escritorio_contabilidade';

export interface Client {
  id: string;
  name: string;
  email: string;
  type: ClientType;
  company?: string;
  cnpj?: string;
  plan: string;
  status: 'ativo' | 'pendente' | 'inativo';
  documentsUploaded: number;
  joinDate: string;
  clientsCount?: number;
  planLimit?: number;
  responsavel?: string;
  telefone?: string;
  logo?: string;
}
