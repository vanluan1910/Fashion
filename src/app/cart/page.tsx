import React from "react";
import { Metadata } from "next";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { CartTable } from "@/features/cart/components/CartTable";

export const metadata: Metadata = {
  title: "Giỏ hàng của bạn | Atelier Fashion",
  description: "Kiểm tra lại các món đồ và tiến hành thanh toán tại cửa hàng thời trang cao cấp Atelier Fashion.",
};

export default function CartPage() {
  return (
    <main className="main_section">
      {/* START Breadcrumb */}
      <AccountBreadcrumb title="Giỏ hàng của bạn" />
      {/* END Breadcrumb */}

      {/* START Cart Section */}
      <section className="cart_section login_section pt-0 pb-[60px] check_out">
        <div className="max-w-[1170px] mx-auto px-[15px] pt-0 pb-0">
          <CartTable />
        </div>
      </section>
      {/* END Cart Section */}
    </main>
  );
}
