import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  title: string;
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ title, items }: BreadcrumbProps) {
  return (
    <section className="bg-input py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 text-xs uppercase tracking-widest font-medium">
            <li className="inline-flex items-center">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={index} className="inline-flex items-center">
                <span className="mx-2 text-muted-foreground">/</span>
                {item.href ? (
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-4xl md:text-5xl font-light uppercase tracking-tight text-foreground">
          {title}
        </h1>
      </div>
    </section>
  );
}
