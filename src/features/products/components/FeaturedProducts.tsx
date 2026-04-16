import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, title: "Silk Dress", price: 59.95, image: "/images/f_product1.png" },
  { id: 2, title: "Premium Party Suit", price: 79.95, image: "/images/f_product2.png" },
  { id: 3, title: "Silk Party Dress", price: 99.95, image: "/images/f_product3.png", isNew: true },
  { id: 4, title: "Jeans Pant", price: 39.95, image: "/images/f_product4.png", isSale: true },
];

export function FeaturedProducts({ title }: { title: string }) {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          {title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_PRODUCTS.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-input mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase">
                    NEW
                  </span>
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <Link 
                    href={`/product/${product.id}`}
                    className="w-full bg-white text-black text-center py-3 rounded-lg font-medium shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    Thêm vào giỏ hàng
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-primary font-bold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
