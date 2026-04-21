"use client";

import { useState, useMemo, useEffect } from "react";
import { Product } from "../types";
import { productService } from "../services/productService";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Load products from service on mount
  useEffect(() => {
    const loadProducts = async () => {
      const data = await productService.getProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productName = String(product.name || "").toLowerCase();
      const productId = String(product.id || "").toLowerCase();
      const term = searchTerm.toLowerCase();

      const matchesSearch = productName.includes(term) || productId.includes(term);
      const matchesCategory = selectedCategory === "Tất cả" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => String(p.id)));
    }
  };

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(item => item !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const deleteProduct = async (id: string) => {
    const success = await productService.deleteProduct(id);
    if (success) {
      setProducts(prev => prev.filter(p => String(p.id) !== id));
    }
  };

  return {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedProducts,
    toggleSelectAll,
    toggleSelectProduct,
    deleteProduct
  };
}
