export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      addresses: {
        Row: {
          city: string
          client_id: string | null
          complement: string | null
          country: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          neighborhood: string
          number: string
          office_id: string | null
          state: string
          street: string
          type: Database["public"]["Enums"]["address_type"]
          updated_at: string | null
          user_id: string | null
          zip_code: string
        }
        Insert: {
          city: string
          client_id?: string | null
          complement?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          neighborhood: string
          number: string
          office_id?: string | null
          state: string
          street: string
          type?: Database["public"]["Enums"]["address_type"]
          updated_at?: string | null
          user_id?: string | null
          zip_code: string
        }
        Update: {
          city?: string
          client_id?: string | null
          complement?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          neighborhood?: string
          number?: string
          office_id?: string | null
          state?: string
          street?: string
          type?: Database["public"]["Enums"]["address_type"]
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addresses_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          client_type: Database["public"]["Enums"]["client_type"]
          cnpj: string | null
          cpf: string | null
          created_at: string | null
          documents_uploaded: number | null
          email: string
          id: string
          join_date: string | null
          name: string | null
          parent_office_id: string | null
          phone: string | null
          razao_social: string | null
          responsible_cpf: string | null
          responsible_name: string | null
          status: Database["public"]["Enums"]["user_status"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          client_type: Database["public"]["Enums"]["client_type"]
          cnpj?: string | null
          cpf?: string | null
          created_at?: string | null
          documents_uploaded?: number | null
          email: string
          id?: string
          join_date?: string | null
          name?: string | null
          parent_office_id?: string | null
          phone?: string | null
          razao_social?: string | null
          responsible_cpf?: string | null
          responsible_name?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          client_type?: Database["public"]["Enums"]["client_type"]
          cnpj?: string | null
          cpf?: string | null
          created_at?: string | null
          documents_uploaded?: number | null
          email?: string
          id?: string
          join_date?: string | null
          name?: string | null
          parent_office_id?: string | null
          phone?: string | null
          razao_social?: string | null
          responsible_cpf?: string | null
          responsible_name?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_parent_office_id_fkey"
            columns: ["parent_office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      collaborators: {
        Row: {
          corporate_email: string | null
          created_at: string | null
          department: string | null
          hire_date: string | null
          id: string
          office_id: string | null
          salary: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          corporate_email?: string | null
          created_at?: string | null
          department?: string | null
          hire_date?: string | null
          id?: string
          office_id?: string | null
          salary?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          corporate_email?: string | null
          created_at?: string | null
          department?: string | null
          hire_date?: string | null
          id?: string
          office_id?: string | null
          salary?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collaborators_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_services: {
        Row: {
          contract_id: string
          created_at: string | null
          id: string
          quantity: number | null
          service_id: string
          unit_price: number | null
        }
        Insert: {
          contract_id: string
          created_at?: string | null
          id?: string
          quantity?: number | null
          service_id: string
          unit_price?: number | null
        }
        Update: {
          contract_id?: string
          created_at?: string | null
          id?: string
          quantity?: number | null
          service_id?: string
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_services_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          client_id: string
          created_at: string | null
          end_date: string | null
          id: string
          monthly_value: number
          observations: string | null
          payment_day: number
          plan_type: Database["public"]["Enums"]["plan_type"]
          start_date: string
          status: Database["public"]["Enums"]["contract_status"]
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          monthly_value: number
          observations?: string | null
          payment_day?: number
          plan_type: Database["public"]["Enums"]["plan_type"]
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status"]
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          monthly_value?: number
          observations?: string | null
          payment_day?: number
          plan_type?: Database["public"]["Enums"]["plan_type"]
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          client_id: string
          created_at: string | null
          file_path: string | null
          file_size: number | null
          id: string
          mime_type: string | null
          name: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["document_status"]
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          mime_type?: string | null
          name: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          mime_type?: string | null
          name?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          title: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: []
      }
      offices: {
        Row: {
          client_limit: number | null
          cnpj: string
          company_name: string
          created_at: string | null
          id: string
          logo: string | null
          office_type: Database["public"]["Enums"]["office_type"]
          phone: string | null
          responsible_cpf: string
          responsible_email: string
          responsible_name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          client_limit?: number | null
          cnpj: string
          company_name: string
          created_at?: string | null
          id?: string
          logo?: string | null
          office_type: Database["public"]["Enums"]["office_type"]
          phone?: string | null
          responsible_cpf: string
          responsible_email: string
          responsible_name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          client_limit?: number | null
          cnpj?: string
          company_name?: string
          created_at?: string | null
          id?: string
          logo?: string | null
          office_type?: Database["public"]["Enums"]["office_type"]
          phone?: string | null
          responsible_cpf?: string
          responsible_email?: string
          responsible_name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_status"]
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price: number | null
          type: Database["public"]["Enums"]["service_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price?: number | null
          type: Database["public"]["Enums"]["service_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number | null
          type?: Database["public"]["Enums"]["service_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_collaborator: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      address_type: "residencial" | "comercial" | "correspondencia"
      client_type:
        | "pessoa_fisica"
        | "escritorio_aai"
        | "escritorio_contabilidade"
      contract_status: "ativo" | "suspenso" | "cancelado" | "finalizado"
      document_status: "pendente" | "aprovado" | "rejeitado" | "em_analise"
      document_type:
        | "rg"
        | "cpf"
        | "cnpj"
        | "declaracao_ir"
        | "comprovante_residencia"
        | "contrato_social"
        | "outros"
      notification_type: "info" | "warning" | "success" | "error"
      office_type: "escritorio_aai" | "escritorio_contabilidade"
      plan_type: "mensal" | "trimestral" | "anual"
      service_type:
        | "assessoria"
        | "declaracao"
        | "consultoria"
        | "planejamento"
        | "outros"
      user_role: "admin" | "colaborador" | "cliente" | "escritorio"
      user_status: "ativo" | "inativo" | "pendente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      address_type: ["residencial", "comercial", "correspondencia"],
      client_type: [
        "pessoa_fisica",
        "escritorio_aai",
        "escritorio_contabilidade",
      ],
      contract_status: ["ativo", "suspenso", "cancelado", "finalizado"],
      document_status: ["pendente", "aprovado", "rejeitado", "em_analise"],
      document_type: [
        "rg",
        "cpf",
        "cnpj",
        "declaracao_ir",
        "comprovante_residencia",
        "contrato_social",
        "outros",
      ],
      notification_type: ["info", "warning", "success", "error"],
      office_type: ["escritorio_aai", "escritorio_contabilidade"],
      plan_type: ["mensal", "trimestral", "anual"],
      service_type: [
        "assessoria",
        "declaracao",
        "consultoria",
        "planejamento",
        "outros",
      ],
      user_role: ["admin", "colaborador", "cliente", "escritorio"],
      user_status: ["ativo", "inativo", "pendente"],
    },
  },
} as const
