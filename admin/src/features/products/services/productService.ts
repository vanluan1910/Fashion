import { Product } from "../types";

const STORAGE_KEY = "atelier_products_data";

const INITIAL_PRODUCTS: Product[] = [
  { id: "#PRO-001", name: "Áo sơ mi lụa Premium", category: "Thời trang nam", price: "1.200.000đ", stock: 45, status: "Còn hàng", image: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=200&auto=format&fit=crop" },
  { id: "#PRO-002", name: "Đầm dạ hội đính đá", category: "Thời trang nữ", price: "3.500.000đ", stock: 12, status: "Cần nhập thêm", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=200&auto=format&fit=crop" },
  { id: "#PRO-003", name: "Quần Âu Slim Fit", category: "Thời trang nam", price: "850.000đ", stock: 120, status: "Còn hàng", image: "https://images.unsplash.com/photo-1624373666563-5475dba0bfca?q=80&w=200&auto=format&fit=crop" },
  { id: "#PRO-004", name: "Túi xách da thủ công", category: "Phụ kiện", price: "2.800.000đ", stock: 5, status: "Hết hàng", image: "https://images.unsplash.com/photo-1584917033904-491178345953?q=80&w=200&auto=format&fit=crop" },
];

export const productService = {
  getProducts: (): Product[] => {
    if (typeof window === "undefined") return INITIAL_PRODUCTS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  getProductById: (id: string): Product | undefined => {
    const products = productService.getProducts();
    // Support both URI encoded IDs and raw IDs
    const decodedId = decodeURIComponent(id);
    return products.find(p => p.id === id || p.id === decodedId);
  },

  saveProducts: (products: Product[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  },

  addProduct: (product: Omit<Product, "id">) => {
    const products = productService.getProducts();
    const newProduct = {
      ...product,
      id: `#PRO-${String(products.length + 1).padStart(3, '0')}`
    };
    productService.saveProducts([newProduct, ...products]);
    return newProduct;
  },

  updateProduct: (id: string, updatedProduct: Partial<Product>) => {
    const products = productService.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      productService.saveProducts(products);
      return products[index];
    }
    return undefined;
  },

  deleteProduct: (id: string) => {
    const products = productService.getProducts();
    const filtered = products.filter(p => p.id !== id);
    productService.saveProducts(filtered);
  }
};
