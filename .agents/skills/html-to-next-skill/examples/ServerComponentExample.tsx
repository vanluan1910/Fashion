import React from 'react';

// This is a Server Component by default in Next.js App Router.
// It fetches data directly from the server.

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

async function fetchProducts(): Promise<Product[]> {
  // Simulate DB fetch
  return [
    { id: '1', name: 'Royal Wedding Gown', price: 5000, description: 'Exquisite silk lace' },
    { id: '2', name: 'Vintage Tuxedo', price: 2500, description: 'Classic 1920s cut' },
  ];
}

export default async function ProductGallery() {
  const products = await fetchProducts();

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-black tracking-widest uppercase mb-8 text-center text-[var(--primary)]">
        Curated Selection
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="luxury-card p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-4 text-center">{product.description}</p>
            <span className="text-lg font-semibold text-[var(--primary)]">
              ${product.price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
