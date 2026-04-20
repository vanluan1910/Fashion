import { useState, useEffect, useMemo } from "react";
import { Customer } from "../types";
import { customerService } from "../services/customerService";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("Tất cả");
  
  // Advanced filters state
  const [cityFilter, setCityFilter] = useState("Tất cả");
  const [minSpent, setMinSpent] = useState<number | "">("");
  const [minOrders, setMinOrders] = useState<number | "">("");

  useEffect(() => {
    setCustomers(customerService.getCustomers());
  }, []);

  const refreshCustomers = () => {
    setCustomers(customerService.getCustomers());
  };

  const addCustomer = (customer: Omit<Customer, "id" | "joined">) => {
    customerService.addCustomer(customer);
    refreshCustomers();
  };

  const deleteCustomer = (id: string) => {
    customerService.deleteCustomer(id);
    refreshCustomers();
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // 1. Search Query
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery);
      
      // 2. Membership Filter
      const matchesMembership = 
        membershipFilter === "Tất cả" || 
        (membershipFilter === "VIP" && customer.isVIP) ||
        (membershipFilter === "Phổ thông" && !customer.isVIP);

      // 3. City Filter
      const matchesCity = cityFilter === "Tất cả" || customer.city === cityFilter;

      // 4. Spent Filter
      const spentValue = parseInt(customer.spent.replace(/\D/g, '')) || 0;
      const matchesSpent = minSpent === "" || spentValue >= minSpent;

      // 5. Orders Filter
      const matchesOrders = minOrders === "" || customer.orders >= minOrders;

      return matchesSearch && matchesMembership && matchesCity && matchesSpent && matchesOrders;
    });
  }, [customers, searchQuery, membershipFilter, cityFilter, minSpent, minOrders]);

  const stats = useMemo(() => {
    return {
      total: customers.length,
      vip: customers.filter(c => c.isVIP).length,
      active: customers.filter(c => c.status === "Hoạt động").length
    };
  }, [customers]);

  return {
    customers: filteredCustomers,
    searchQuery,
    setSearchQuery,
    membershipFilter,
    setMembershipFilter,
    cityFilter,
    setCityFilter,
    minSpent,
    setMinSpent,
    minOrders,
    setMinOrders,
    addCustomer,
    deleteCustomer,
    stats,
    totalCount: customers.length,
    resetFilters: () => {
      setSearchQuery("");
      setMembershipFilter("Tất cả");
      setCityFilter("Tất cả");
      setMinSpent("");
      setMinOrders("");
    }
  };
};
