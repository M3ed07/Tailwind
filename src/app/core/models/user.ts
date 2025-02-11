export interface TableData {
    id: number;
    fullName: string;
    gender: 'Male' | 'Female' | 'Other';
    birthdate: string; // ISO format (YYYY-MM-DD) or Date object
    address: string;
    phone: string;
    username: string;
    password: string;
    rating: number; // Assuming rating is a number (e.g., 1-5)
    permission: string;
  }
  
  export interface TableHeader {
    field: string;
    header: string;
    type: 'text' | 'email' | 'number' | 'date' | 'select' | 'boolean';
    options?: string[]; // Used for select fields (e.g., gender, group)
  }
  