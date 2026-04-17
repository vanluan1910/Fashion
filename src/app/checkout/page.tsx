import React from "react";
import type { Metadata } from "next";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Earthyellow",
  description: "Complete your purchase at Earthyellow luxury fashion store.",
};

export default function CheckoutPage() {
  return (
    <main className="main_section">
      {/* START Breadcrumb */}
      <AccountBreadcrumb title="Checkout" />
      {/* END Breadcrumb */}

      {/* START Checkout Section */}
      <section className="checkout_section py-[60px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <CheckoutForm />
        </div>
      </section>
      {/* END Checkout Section */}
    </main>
  );
}
