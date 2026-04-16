import React from "react";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { CollectionGrid } from "@/features/collections/components/CollectionGrid";
import { FeaturedProducts } from "@/features/products/components/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner Section */}
      <HeroSection />

      {/* Categories / Collections Grid */}
      <CollectionGrid />

      {/* Featured Products Showcase */}
      <FeaturedProducts title="Sản phẩm nổi bật" />

      {/* Additional sections can be added here */}
    </div>
  );
}
