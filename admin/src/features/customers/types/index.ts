export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  joined: string;
  orders: number;
  spent: string;
  status: "Hoạt động" | "Bị khóa" | string;
  isVIP: boolean;
}
