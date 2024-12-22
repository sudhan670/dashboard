export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          name: string;
          cohort: string;
          courses: string[];
          date_joined: string;
          last_login: string;
          status: 'active' | 'inactive';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['students']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['students']['Insert']>;
      };
    };
  };
}