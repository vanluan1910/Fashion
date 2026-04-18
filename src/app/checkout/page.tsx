"use client";
import React, { useState } from "react";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <main className="">
      {/* Chỉ hiện Breadcrumb khi chưa đặt hàng thành công */}
      {!isSuccess && <AccountBreadcrumb title="thanh toán" />}

      {/* START Checkout Section */}
      <section className={`checkout_section ${isSuccess ? "pt-[20px]" : "pt-[20px]"} pb-[80px]`}>
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <CheckoutForm onSuccess={() => setIsSuccess(true)} />
        </div>
      </section>
      {/* END Checkout Section */}
    </main>
  );
}
