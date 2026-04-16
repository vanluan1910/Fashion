import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
}

const SAMPLE_SHOP_PRODUCTS: Product[] = [
  { id: 1, name: "Luxury Silk Dress", price: 120.00, image: "/images/f_product1.png", category: "Dresses" },
  { id: 2, name: "Premium Tailored Suit", price: 250.00, oldPrice: 300.00, image: "/images/f_product2.png", category: "Suits" },
  { id: 3, name: "Atelier Party Blouse", price: 85.00, image: "/images/f_product3.png", category: "Tops" },
  { id: 4, name: "Designer Denim Pant", price: 110.00, image: "/images/f_product4.png", category: "Bottoms" },
  { id: 5, name: "Evening Gown", price: 450.00, image: "/images/f_product5.png", category: "Dresses" },
  { id: 6, name: "Summer Linen Shirt", price: 75.00, image: "/images/f_product6.png", category: "Shirts" },
];

export function ProductGrid() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em]">Showing 1–12 of 30 results</h2>
        <select className="bg-transparent border border-border text-xs uppercase px-4 py-2 outline-none focus:border-primary">
          <option>Default Sorting</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest Arrivals</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {SAMPLE_SHOP_PRODUCTS.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden bg-input mb-4 luxury-card">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              
              {/* Quick Actions overlay */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button className="w-full bg-white py-3 text-xs font-bold uppercase tracking-widest text-black hover:bg-primary hover:text-white transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
            
            <div className="text-center space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{product.category}</p>
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
              <div className="flex items-center justify-center space-x-2">
                {product.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>
                )}
                <span className="text-sm font-bold text-primary">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center space-x-4">
        {[1, 2, 3].map((num) => (
          <button 
            key={num}
            className={`w-10 h-10 border flex items-center justify-center text-xs font-bold ${num === 1 ? "bg-primary text-white border-primary" : "border-border hover:border-primary hover:text-primary"} transition-all`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
