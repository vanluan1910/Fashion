"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-header w-full h-20 flex items-center justify-between px-4 md:px-12">
      {/* Logo */}
      <Link href="/" className="relative w-32 h-12">
        <Image 
          src="/images/logo.png" 
          alt="Atelier Logo" 
          fill 
          className="object-contain"
        />
      </Link>

      {/* Navigation - Desktop */}
      <nav className="hidden lg:flex items-center space-x-8">
        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">HOME</Link>
        <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">SHOP</Link>
        <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">BLOG</Link>
        <Link href="/pages" className="text-sm font-medium hover:text-primary transition-colors">PAGES</Link>
        <Link href="/sale" className="text-sm font-medium text-red-600 font-bold">SALE</Link>
      </nav>

      {/* Icons */}
      <div className="flex items-center space-x-6">
        <button className="hover:text-primary transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <Link href="/cart" className="relative hover:text-primary transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            0
          </span>
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
