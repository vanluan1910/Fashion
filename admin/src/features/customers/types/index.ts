export interface Customer {
  id: string;
  account_id?: number; // From Backend API
  name: string;
  full_name?: string;  // From Backend API
  email: string;
  phone: string;
  city: string;
  joined: string;
  orders: number;
  spent: string;
  status: "Hoạt động" | "Bị khóa" | string;
  isVIP: boolean;
}
