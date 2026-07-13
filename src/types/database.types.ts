// Hand-written from the live schema of Supabase project wmcliqjttbpihjcosmmc
// (cityzen_application_layer). Covers only the tables the app actually queries:
//   core        — directory-cache tables (directory-cache.ts) + kpi_snapshots (executive-daily-brief.ts)
//   disaster_ops — districts / incidents / resources / missions (executive-daily-brief.ts)
// Extend when a new table gets queried; the DB has many more tables (see docs/DATA_ACCESS.md §3).
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: { PostgrestVersion: "14.5" };
  public: {
    Tables: { [_ in never]: never };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
  core: {
    Tables: {
      tenant_directory_cache: {
        Row: {
          thundercore_tenant_id: string;
          tenant_type: string | null;
          code: string | null;
          name: string;
          status: string | null;
          synced_at: string;
        };
        Insert: {
          thundercore_tenant_id: string;
          tenant_type?: string | null;
          code?: string | null;
          name: string;
          status?: string | null;
          synced_at?: string;
        };
        Update: {
          thundercore_tenant_id?: string;
          tenant_type?: string | null;
          code?: string | null;
          name?: string;
          status?: string | null;
          synced_at?: string;
        };
        Relationships: [];
      };
      department_directory_cache: {
        Row: {
          thundercore_department_id: string;
          thundercore_tenant_id: string;
          department_type: string | null;
          abbreviation: string | null;
          name: string;
          status: string | null;
          synced_at: string;
        };
        Insert: {
          thundercore_department_id: string;
          thundercore_tenant_id: string;
          department_type?: string | null;
          abbreviation?: string | null;
          name: string;
          status?: string | null;
          synced_at?: string;
        };
        Update: {
          thundercore_department_id?: string;
          thundercore_tenant_id?: string;
          department_type?: string | null;
          abbreviation?: string | null;
          name?: string;
          status?: string | null;
          synced_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "department_directory_cache_thundercore_tenant_id_fkey";
            columns: ["thundercore_tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenant_directory_cache";
            referencedColumns: ["thundercore_tenant_id"];
          },
        ];
      };
      user_directory_cache: {
        Row: {
          thundercore_user_id: string;
          display_name: string;
          email: string | null;
          avatar_url: string | null;
          role_label: string | null;
          synced_at: string;
        };
        Insert: {
          thundercore_user_id: string;
          display_name: string;
          email?: string | null;
          avatar_url?: string | null;
          role_label?: string | null;
          synced_at?: string;
        };
        Update: {
          thundercore_user_id?: string;
          display_name?: string;
          email?: string | null;
          avatar_url?: string | null;
          role_label?: string | null;
          synced_at?: string;
        };
        Relationships: [];
      };
      membership_directory_cache: {
        Row: {
          thundercore_user_id: string;
          thundercore_tenant_id: string;
          status: string;
          role_codes: string[];
          synced_at: string;
        };
        Insert: {
          thundercore_user_id: string;
          thundercore_tenant_id: string;
          status?: string;
          role_codes?: string[];
          synced_at?: string;
        };
        Update: {
          thundercore_user_id?: string;
          thundercore_tenant_id?: string;
          status?: string;
          role_codes?: string[];
          synced_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "membership_directory_cache_thundercore_tenant_id_fkey";
            columns: ["thundercore_tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenant_directory_cache";
            referencedColumns: ["thundercore_tenant_id"];
          },
          {
            foreignKeyName: "membership_directory_cache_thundercore_user_id_fkey";
            columns: ["thundercore_user_id"];
            isOneToOne: false;
            referencedRelation: "user_directory_cache";
            referencedColumns: ["thundercore_user_id"];
          },
        ];
      };
      kpi_snapshots: {
        Row: {
          id: string;
          thundercore_tenant_id: string;
          module: string;
          metric_name: string;
          value: number;
          unit: string | null;
          trend_percent: number | null;
          direction: string | null;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          thundercore_tenant_id: string;
          module: string;
          metric_name: string;
          value: number;
          unit?: string | null;
          trend_percent?: number | null;
          direction?: string | null;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          thundercore_tenant_id?: string;
          module?: string;
          metric_name?: string;
          value?: number;
          unit?: string | null;
          trend_percent?: number | null;
          direction?: string | null;
          recorded_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
  disaster_ops: {
    Tables: {
      districts: {
        Row: {
          id: string;
          thundercore_tenant_id: string;
          name: string;
          risk_status: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          thundercore_tenant_id: string;
          name: string;
          risk_status?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          thundercore_tenant_id?: string;
          name?: string;
          risk_status?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      incidents: {
        Row: {
          id: string;
          district_id: string;
          thundercore_department_id: string | null;
          title: string;
          status: string;
          impact_count: number | null;
          impact_unit: string | null;
          reported_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          district_id: string;
          thundercore_department_id?: string | null;
          title: string;
          status?: string;
          impact_count?: number | null;
          impact_unit?: string | null;
          reported_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          district_id?: string;
          thundercore_department_id?: string | null;
          title?: string;
          status?: string;
          impact_count?: number | null;
          impact_unit?: string | null;
          reported_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "incidents_district_id_fkey";
            columns: ["district_id"];
            isOneToOne: false;
            referencedRelation: "districts";
            referencedColumns: ["id"];
          },
        ];
      };
      resources: {
        Row: {
          id: string;
          thundercore_department_id: string | null;
          type: string;
          name: string;
          quantity: number;
          readiness_percent: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          thundercore_department_id?: string | null;
          type: string;
          name: string;
          quantity?: number;
          readiness_percent?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          thundercore_department_id?: string | null;
          type?: string;
          name?: string;
          quantity?: number;
          readiness_percent?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      missions: {
        Row: {
          id: string;
          incident_id: string;
          thundercore_department_id: string | null;
          title: string;
          progress_percent: number;
          status: string;
          started_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          incident_id: string;
          thundercore_department_id?: string | null;
          title: string;
          progress_percent?: number;
          status?: string;
          started_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          incident_id?: string;
          thundercore_department_id?: string | null;
          title?: string;
          progress_percent?: number;
          status?: string;
          started_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "missions_incident_id_fkey";
            columns: ["incident_id"];
            isOneToOne: false;
            referencedRelation: "incidents";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
