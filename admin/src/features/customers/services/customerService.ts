import { Customer } from "../types";

const STORAGE_KEY = "atelier_customers_data";

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "#CUS-001", name: "Lê Thị Hồng Nhung", email: "nhung.le@gmail.com", phone: "0901 234 567", city: "TP. Hồ Chí Minh", joined: "12/01/2024", orders: 12, spent: "24.500.000đ", status: "Hoạt động", isVIP: true },
  { id: "#CUS-002", name: "Trần Minh Quang", email: "quang.tm@yahoo.com", phone: "0912 345 678", city: "Hà Nội", joined: "05/02/2024", orders: 5, spent: "8.200.000đ", status: "Hoạt động", isVIP: false },
  { id: "#CUS-003", name: "Nguyễn Thảo Nguyên", email: "nguyen.thaonguyen@gmail.com", phone: "0345 678 910", city: "Đà Nẵng", joined: "15/03/2024", orders: 2, spent: "1.500.000đ", status: "Bị khóa", isVIP: false },
  { id: "#CUS-004", name: "Vũ Hải Đăng", email: "dang.vh@outlook.com", phone: "0888 999 000", city: "Hải Phòng", joined: "20/03/2024", orders: 8, spent: "15.000.000đ", status: "Hoạt động", isVIP: true },
];

export const customerService = {
  getCustomers: (): Customer[] => {
    if (typeof window === "undefined") return INITIAL_CUSTOMERS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CUSTOMERS));
      return INITIAL_CUSTOMERS;
    }
    return JSON.parse(stored);
  },

  saveCustomers: (customers: Customer[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    }
  },

  addCustomer: (customer: Omit<Customer, "id" | "joined">) => {
    const customers = customerService.getCustomers();
    const newCustomer: Customer = {
      ...customer,
      id: `#CUS-${String(customers.length + 1).padStart(3, '0')}`,
      joined: new Date().toLocaleDateString('vi-VN'),
    };
    const updated = [newCustomer, ...customers];
    customerService.saveCustomers(updated);
    return newCustomer;
  },

  deleteCustomer: (id: string) => {
    const customers = customerService.getCustomers();
    const filtered = customers.filter(c => c.id !== id);
    customerService.saveCustomers(filtered);
  }
};
