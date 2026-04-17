import { Product, ShopCategory, ShopColor } from "../types/shop-types";

export const SHOP_CATEGORIES: ShopCategory[] = [
  { id: "tops", name: "Tops", count: 12 },
  { id: "outerwear", name: "Outerwear", count: 8 },
  { id: "bottoms", name: "Bottoms", count: 15 },
  { id: "activewear", name: "Activewear", count: 5 },
  { id: "sleepwear", name: "Sleepwear", count: 3 },
  { id: "swimwear", name: "Swimwear", count: 4 },
  { id: "shoes", name: "Shoes & Accessories", count: 10 },
];

export const SHOP_SIZES = ["xs", "s", "m", "l", "xl", "xxl", "xxxl", "uk 6"];

export const SHOP_COLORS: ShopColor[] = [
  { id: "color1", hex: "#f74f2e", name: "Orange" },
  { id: "color2", hex: "#333333", name: "Dark" },
  { id: "color3", hex: "#ffffff", name: "White" },
  { id: "color4", hex: "#e5e5e5", name: "Gray" },
  { id: "color5", hex: "#0000ff", name: "Blue" },
  { id: "color6", hex: "#00ff00", name: "Green" },
];

export const SHOP_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Silk Dress",
    price: 59.95,
    image: "/images/f_product1.png",
    category: "Dresses",
    sizes: ["xs", "s", "m", "l", "xl"]
  },
  {
    id: 2,
    name: "Premium Party Suit",
    price: 79.95,
    image: "/images/f_product2.png",
    category: "Suits",
    sizes: ["s", "m", "l"]
  },
  {
    id: 3,
    name: "Silk Party Dress",
    price: 99.95,
    image: "/images/f_product3.png",
    category: "Dresses",
    label: "new",
    isNew: true,
    sizes: ["l"]
  },
  {
    id: 4,
    name: "Man T-Shirt",
    price: 19.95,
    image: "/images/f_product5.png",
    category: "T-Shirts",
    label: "new",
    isNew: true,
    sizes: ["m", "l"]
  },
  {
    id: 5,
    name: "Flower Floral Dupioni Dress",
    price: 79.95,
    image: "/images/f_product6.png",
    category: "Dresses",
    label: "sold-out",
    sizes: []
  },
  {
    id: 6,
    name: "Check Shirt",
    price: 29.95,
    originalPrice: 39.95,
    image: "/images/f_product7.png",
    category: "Shirts",
    label: "sale",
    discount: true,
    sizes: ["m"],
    daysLeft: 12
  },
  {
    id: 7,
    name: "Jeans Pant",
    price: 39.95,
    originalPrice: 59.95,
    image: "/images/f_product4.png",
    category: "Bottoms",
    label: "sale",
    discount: true,
    sizes: ["M"],
    daysLeft: 12
  },
  {
    id: 8,
    name: "Black Dotted Dress",
    price: 29.95,
    image: "/images/f_product8.png",
    category: "Dresses",
    sizes: ["l"]
  }
];
