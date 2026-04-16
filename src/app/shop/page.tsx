import React from "react";
import { Breadcrumb } from "../../shared/components/Breadcrumb";
import { ShopSidebar } from "../../features/shop/components/ShopSidebar";
import { ProductGrid } from "../../features/shop/components/ProductGrid";

export const metadata = {
  title: "Shop | The Curated Atelier",
  description: "Browse our elite collection of high-end fashion and artisan accessories.",
};

export default function ShopPage() {
  return (
    <div className="flex flex-col w-full">
      <Breadcrumb 
        title="Shop" 
        items={[{ label: "Shop" }]} 
      />

      <section className="container mx-auto py-20 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <ShopSidebar />

          {/* Main Product Display */}
          <ProductGrid />
        </div>
      </section>
    </div>
  );
}
