import React from "react";
import Image from "next/image";
import Link from "next/link";

const COLLECTIONS = [
  { id: 1, title: "Women", image: "/images/women.png", link: "/category/women" },
  { id: 2, title: "Men", image: "/images/men.png", link: "/category/men" },
  { id: 3, title: "Products", image: "/images/products.png", link: "/products" },
];

export function CollectionGrid() {
  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {COLLECTIONS.map((item) => (
          <Link 
            key={item.id} 
            href={item.link}
            className="group relative h-[400px] overflow-hidden rounded-2xl luxury-card"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end pb-12 hover:bg-black/20 transition-all duration-500">
              <span className="text-white text-2xl font-semibold tracking-wider uppercase flex items-center">
                {item.title}
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
