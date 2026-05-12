"use client";

import React from "react";
import { Edit, Trash2, Package } from "lucide-react";
import Link from "next/link";
import { Product } from "../types";

interface ProductTableProps {
  products: Product[];
  selectedProducts: string[];
  toggleSelectProduct: (id: string) => void;
  toggleSelectAll: () => void;
  isAllSelected: boolean;
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  selectedProducts,
  toggleSelectProduct,
  toggleSelectAll,
  isAllSelected,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="admin-table-head border-b border-[var(--admin-border)]">
            <th className="w-10 p-4">
              <input
                type="checkbox"
                className="cursor-pointer rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="p-4 text-[13px] font-semibold uppercase tracking-wider">Sản phẩm</th>
            <th className="p-4 text-center text-[13px] font-semibold uppercase tracking-wider">Danh mục</th>
            <th className="p-4 text-center text-[13px] font-semibold uppercase tracking-wider">Loại</th>
            <th className="p-4 text-[13px] font-semibold uppercase tracking-wider">Giá bán</th>
            <th className="p-4 text-center text-[13px] font-semibold uppercase tracking-wider">Tồn kho</th>
            <th className="p-4 text-[13px] font-semibold uppercase tracking-wider">Trạng thái</th>
            <th className="p-4 text-right text-[13px] font-semibold uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="group border-b border-[rgba(84,67,52,0.08)] transition-colors hover:bg-[rgba(255,255,255,0.72)]">
              <td className="p-4">
                <input
                  type="checkbox"
                  className="cursor-pointer rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[rgba(255,255,255,0.72)] shadow-sm">
                    <img src={product.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold tracking-tight text-[var(--admin-heading)]">{product.name}</p>
                    <p className="text-[12px] text-[var(--admin-text-muted)]">{product.id}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-center">
                <span className="inline-block rounded-lg bg-[var(--admin-accent-soft)] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--admin-accent-strong)]">
                  {product.category}
                </span>
              </td>
              <td className="p-4 text-center">
                <span className="text-[13px] font-medium text-[var(--admin-text-muted)]">{product.subCategory || "---"}</span>
              </td>
              <td className="p-4 text-[14px] font-semibold tracking-tight text-[var(--admin-heading)]">{product.price}</td>
              <td className="p-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-[14px] font-semibold text-[var(--admin-heading)]">{product.stock}</span>
                  <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-[rgba(84,67,52,0.08)]">
                    <div className="h-full bg-[var(--admin-accent)]" style={{ width: `${Math.min(product.stock, 100)}%` }} />
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      product.status === "Còn hàng" ? "bg-green-500" : product.status === "Hết hàng" ? "bg-red-500" : "animate-pulse bg-orange-500"
                    }`}
                  />
                  <span className="text-[13px] font-semibold text-[var(--admin-text)]">{product.status}</span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-1 text-[var(--admin-text-muted)] transition-all">
                  <Link
                    href={`/products/add?id=${encodeURIComponent(product.id)}`}
                    title="Chỉnh sửa"
                    className="rounded-xl p-2 transition-all hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => onDelete(product.id)} title="Xóa" className="rounded-xl p-2 transition-all hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="flex flex-col items-center gap-2 bg-white p-10 text-center font-medium text-[var(--admin-text-muted)]">
          <Package size={48} strokeWidth={1} />
          <span>Không tìm thấy sản phẩm phù hợp.</span>
        </div>
      )}
    </div>
  );
}
