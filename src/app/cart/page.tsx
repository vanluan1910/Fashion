import React from "react";
import { Metadata } from "next";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { CartTable } from "@/features/cart/components/CartTable";

export const metadata: Metadata = {
  title: "Your Cart | Earthyellow",
  description: "Review your items and proceed to checkout at Earthyellow luxury storefront.",
};

export default function CartPage() {
  return (
    <main className="main_section">
      {/* START Breadcrumb */}
      <AccountBreadcrumb title="Your Cart" />
      {/* END Breadcrumb */}

      {/* START Cart Section */}
      <section className="cart_section login_section py-[60px] check_out">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <CartTable />
        </div>
      </section>
      {/* END Cart Section */}
    </main>
  );
}
