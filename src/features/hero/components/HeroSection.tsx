"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
// In a real project, we would use Swiper or Framer Motion for the slider logic
// For this conversion, we'll create the structure for a premium slider

export function HeroSection() {
  const slides = [
    {
      id: 1,
      image: "/images/banner_img.jpg",
      title: "Hot Collection",
      subtitle: "Step inside and choose your favorite",
      link: "/shop",
    },
    {
      id: 2,
      image: "/images/Banner-2.jpg",
      title: "Luxury Style",
      subtitle: "Experience the elite fashion sense",
      link: "/shop",
    },
  ];

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-background">
      {/* Sample Slide (composed as a simplified version of the Slider Revolution) */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === 0 ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-4xl md:text-7xl font-bold text-foreground mb-4 transform translate-y-0 transition-transform duration-700">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl">
                {slide.subtitle}
              </p>
              <Link 
                href={slide.link}
                className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-lg font-medium"
              >
                SHOP NOW
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
