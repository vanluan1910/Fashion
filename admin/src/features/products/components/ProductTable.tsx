"use client";

import React from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package
} from "lucide-react";
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
  onDelete
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#fcfcff] border-b border-[#eee]">
            <th className="p-4 w-10">
              <input 
                type="checkbox" 
                className="rounded border-[#ddd] text-[#845adf] focus:ring-[#845adf] cursor-pointer"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="p-4 text-[13px] font-bold text-[#333] uppercase tracking-wider">Sản phẩm</th>
            <th className="p-4 text-[13px] font-bold text-[#333] uppercase tracking-wider">Danh mục</th>
            <th className="p-4 text-[13px] font-bold text-[#333] uppercase tracking-wider">Giá bán</th>
            <th className="p-4 text-[13px] font-bold text-[#333] uppercase tracking-wider text-center">Tồn kho</th>
            <th className="p-4 text-[13px] font-bold text-[#333] uppercase tracking-wider">Trạng thái</th>
            <th className="p-4 text-[13px] font-bold text-[#333] uppercase tracking-wider text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-[#f1f1f1] hover:bg-[#fcfcff] transition-colors group">
              <td className="p-4">
                <input 
                  type="checkbox" 
                  className="rounded border-[#ddd] text-[#845adf] focus:ring-[#845adf] cursor-pointer"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#eee] overflow-hidden shadow-sm flex-shrink-0">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#333] tracking-tight">{product.name}</p>
                    <p className="text-[12px] text-[#999] font-bold">{product.id}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="px-3 py-1 bg-[#845adf10] text-[#845adf] text-[11px] font-bold rounded-lg uppercase tracking-wide">
                  {product.category}
                </span>
              </td>
              <td className="p-4 text-[14px] font-bold text-[#333] tracking-tight">{product.price}</td>
              <td className="p-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-[14px] font-bold text-[#333]">{product.stock}</span>
                  <div className="w-16 h-1 bg-[#eee] rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-[#845adf]" style={{ width: `${Math.min(product.stock, 100)}%` }}></div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${product.status === "Còn hàng" ? 'bg-green-500' : product.status === "Hết hàng" ? 'bg-red-500' : 'bg-orange-500 animate-pulse'}`}></div>
                  <span className="text-[13px] font-bold text-[#555]">{product.status}</span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-1 text-[#777] transition-all">
                  <Link 
                    href={`/products/add?id=${encodeURIComponent(product.id)}`}
                    title="Chỉnh sửa" 
                    className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                  >
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => onDelete(product.id)} title="Xóa" className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="p-10 text-center text-[#999] font-medium bg-white flex flex-col items-center gap-2">
          <Package size={48} strokeWidth={1} />
          <span>Không tìm thấy sản phẩm phù hợp.</span>
        </div>
      )}
    </div>
  );
}
