import { Product } from "../types/shop-types";

export const SHOP_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    price: 45.00,
    image: "/images/f_product7.png", // Đổi sang ảnh nam
    category: "Men",
    subCategory: "Jackets",
    sizes: ["s", "m", "l", "xl"]
  },
  {
    id: 2,
    name: "Cotton Summer Dress",
    price: 35.00,
    image: "/images/f_product2.png", // Ảnh váy xanh (Nữ)
    category: "Women",
    subCategory: "Dresses",
    sizes: ["s", "m", "l"]
  },
  {
    id: 3,
    name: "Leather Handbag",
    price: 120.00,
    image: "/images/jewelry_necklace.png",
    category: "Accessories",
    subCategory: "Handbags",
    sizes: ["One Size"]
  },
  {
    id: 4,
    name: "Floral Print Skirt",
    price: 28.00,
    image: "/images/f_product6.png", // Ảnh váy (Nữ)
    category: "Women",
    subCategory: "Skirts",
    sizes: ["s", "m"]
  },
  {
    id: 5,
    name: "Woolen Sweater",
    price: 55.00,
    image: "/images/f_product5.png", // Ảnh nam/unisex
    category: "Men",
    subCategory: "Sweaters",
    sizes: ["m", "l", "xl"]
  },
  {
    id: 6,
    name: "Silk Evening Gown",
    price: 250.00,
    image: "/images/f_product1.png", // Đây thực tế là ảnh váy xanh (Nữ) - Chỉnh về Women
    category: "Women",
    subCategory: "Dresses",
    sizes: ["s", "m"]
  },
  {
    id: 7,
    name: "Casual T-Shirt",
    price: 15.00,
    image: "/images/f_product7.png",
    category: "Men",
    subCategory: "T-Shirts",
    sizes: ["s", "m", "l", "xl"]
  },
  {
    id: 8,
    name: "Summer Sandals",
    price: 45.00,
    image: "/images/f_product4.png",
    category: "Accessories",
    subCategory: "Shoes",
    sizes: ["37", "38", "39", "40"]
  },
  {
    id: 16,
    name: "Designer Summer Hat",
    price: 19.95,
    originalPrice: 34.95,
    image: "/images/jewelry_necklace.png",
    category: "Accessories",
    subCategory: "Hats",
    label: "sale",
    discount: true,
    sizes: ["M"]
  },
  {
    id: 17,
    name: "Premium Denim Jacket",
    price: 49.95,
    originalPrice: 89.95,
    image: "/images/f_product7.png",
    category: "Men",
    subCategory: "Jackets",
    label: "sale",
    discount: true,
    sizes: ["s", "m", "l", "xl"]
  },
  {
    id: 18,
    name: "Slim Fit Jeans",
    price: 39.95,
    image: "/images/f_product7.png",
    category: "Men",
    subCategory: "Jeans",
    sizes: ["30", "32", "34"]
  },
  {
    id: 19,
    name: "Slim Fit Suit",
    price: 199.00,
    image: "/images/f_product5.png",
    category: "Men",
    subCategory: "Suits",
    sizes: ["48", "50", "52"]
  }
];

export const SHOP_CATEGORIES = [
  { id: 1, name: "Men", count: 6 },
  { id: 2, name: "Women", count: 8 },
  { id: 3, name: "Accessories", count: 10 }
];

export const SHOP_SIZES = [
  { id: 1, name: "XS" }, { id: 2, name: "S" }, { id: 3, name: "M" }, { id: 4, name: "L" }, { id: 5, name: "XL" }
];

export const SHOP_COLORS = [
  { id: 1, name: "Pink", hex: "#fbcee0" },
  { id: 2, name: "Blue", hex: "#9cb3f1" },
  { id: 3, name: "Orange", hex: "#fda430" }
];
