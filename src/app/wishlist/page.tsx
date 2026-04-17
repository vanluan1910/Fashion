import React from "react";
import { Metadata } from "next";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { WishlistTable } from "@/features/wishlist/components/WishlistTable";

export const metadata: Metadata = {
  title: "Wishlist | Earthyellow",
  description: "View and manage your favorite luxury fashion pieces in your Earthyellow wishlist.",
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-white">
      <AccountBreadcrumb title="Wishlist" />
      <WishlistTable />
    </main>
  );
}
