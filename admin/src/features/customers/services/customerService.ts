import { Customer } from "../types";

const API_URL = "http://localhost:5000/api/auth";

export const customerService = {
  getCustomers: async (): Promise<any[]> => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      return [];
    }
  },

  addCustomer: async (customer: any) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: customer.full_name || customer.name,
          email: customer.email,
          password: "customer123", // Default password for admin-created users
          phone: customer.phone,
          city: customer.city
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to add customer:", error);
      return null;
    }
  },

  deleteCustomer: (id: string) => {
    console.log("Delete customer from Admin not implemented with Backend yet");
    return null;
  }
};
