import React from "react";
import { HeroSection } from "../features/hero/components/HeroSection";
import { CollectionGrid } from "../features/collections/components/CollectionGrid";
import { SummerSale } from "../features/hero/components/SummerSale";
import { FeaturedProducts } from "../features/products/components/FeaturedProducts";
import { LatestBlog } from "../features/blog/components/LatestBlog";
import { BrandLogos } from "../features/brands/components/BrandLogos";
import { InstagramSection } from "../features/social/components/InstagramSection";
import { NewsletterSection } from "../shared/components/NewsletterSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner Section */}
      <HeroSection />

      {/* Categories / Collections Grid */}
      <CollectionGrid />

      {/* Summer Sale Banner */}
      <SummerSale />

      {/* Featured Products Showcase */}
      <FeaturedProducts title="Featured Products" />

      {/* Latest Blog Section */}
      <LatestBlog />

      {/* Brand Logos Section */}
      <BrandLogos />

      {/* Instagram Feature Section */}
      <InstagramSection />

      {/* Newsletter Subscription Section */}
      <NewsletterSection />
    </div>
  );
}
