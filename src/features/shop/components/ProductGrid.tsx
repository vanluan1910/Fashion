"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { getproductsData } from "../../products/services/productsService";

export function ProductGrid({ category }: { category?: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState(3);
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const categoryFilter = (category ? [category.toLowerCase()] : searchParams.get("category")?.toLowerCase().split(",")) || [];
  const saleFilter = searchParams.get("sale") === "true";
  const sizeFilter = searchParams.get("size")?.toLowerCase().split(",") || [];
  const colorFilter = searchParams.get("color")?.toLowerCase().split(",") || [];
  const minPriceFilter = Number(searchParams.get("minPrice")) || 0;
  const maxPriceFilter = Number(searchParams.get("maxPrice")) || 999999999;

  React.useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await getproductsData();
      setProducts(data);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  // Filter products based on URL params
  const filteredProducts = products.filter((product) => {
    // 1. Lọc theo ID (Nếu là kết quả tìm kiếm đích danh)
    if (idParam) return String(product.id) === idParam;

    // 2. Lọc theo Khoảng giá
    const price = Number(product.price);
    if (price < minPriceFilter || price > maxPriceFilter) return false;

    // 3. Lọc theo Danh mục (Hỗ trợ chọn nhiều mục)
    const productCat = String(product.category || "").toLowerCase();
    if (categoryFilter.length > 0 && !categoryFilter.some(filter => productCat.includes(filter))) {
      return false;
    }

    // 4. Lọc theo Trạng thái Giảm giá
    if (saleFilter && !product.label?.toLowerCase().includes("sale")) return false;

    // 5. Lọc theo Kích cỡ
    if (sizeFilter.length > 0) {
      const productSizes = (product.sizes || []).map((s: string) => s.toLowerCase());
      if (!sizeFilter.some(s => productSizes.includes(s))) return false;
    }

    return true;
  });

  if (isLoading) {
    return (
      <div className="flex-1 py-20 text-center text-[#999] italic">
        Đang tải danh sách sản phẩm từ kho...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      {/* START Collection Sorting */}
      <motion.div 
        className="collection-sorting-row flex flex-wrap items-center justify-between mb-[50px] border-b border-[#ececec] pb-[8px]"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <div className="flex items-center">
          <div className="hidden lg:block mb-[10px]">
            <p className="text-[14px] text-[#777] font-sans">
              {idParam && filteredProducts.length > 0 ? (
                <>Hiển thị 1 kết quả cho "<span className="font-bold">{filteredProducts[0].name}</span>"</>
              ) : categoryFilter ? (
                <>Hiển thị {filteredProducts.length} kết quả cho "<span className="font-bold">{categoryFilter}</span>"</>
              ) : (
                <>Hiển thị tất cả {filteredProducts.length} sản phẩm</>
              )}
            </p>
          </div>

          <div className="product_grid hidden lg:block ml-[40px] mb-[10px]">
            <ul className="flex items-center space-x-[20px] list-none p-0 m-0">
              <li onClick={() => setColumns(2)} className={`grid_2 cursor-pointer ${columns === 2 ? "active" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 20 30">
                  <path d="M12.008,11.006h7.986v8H12.008v-8Zm-12,0H7.994v8H0.008v-8Zm0,11H7.994v8H0.008v-8Zm12,0h7.986v8H12.008v-8Zm-12-22H8v8H0.009v-8ZM12,0.006h7.991v8H12v-8Z" fill={columns === 2 ? "#333" : "#aaa"} />
                </svg>
              </li>
              <li onClick={() => setColumns(3)} className={`grid_3 cursor-pointer ${columns === 3 ? "active" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 30">
                   <path d="M12.008,11.006h7.986v8H12.008v-8Zm-12,0H7.994v8H0.008v-8Zm0,11H7.994v8H0.008v-8Zm12,0h7.986v8H12.008v-8Zm-12-22H8v8H0.009v-8ZM12,0.006h7.991v8H12v-8Zm12,11h7.986v8H24.008v-8Zm0,11h7.986v8H24.008v-8Zm0-22h7.991v8H24v-8Z" fill={columns === 3 ? "#333" : "#aaa"} />
                </svg>
              </li>
              <li onClick={() => setColumns(4)} className={`grid_4 cursor-pointer ${columns === 4 ? "active" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="30" viewBox="0 0 41 30">
                  <path d="M11.008,11.006h7.986v8H11.008v-8Zm-11,0H7.994v8H0.008v-8Zm0,11H7.994v8H0.008v-8Zm11,0h7.986v8H11.008v-8Zm-11-22H8v8H0.008v-8ZM11,0.006h7.991v8H11v-8Zm11,11h7.986v8H22.008v-8Zm0,11h7.986v8H22.008v-8Zm0-22h7.991v8H22v-8Zm11,11h7.986v8H33.008v-8Zm0,11h7.986v8H33.008v-8Zm0-22h7.991v8H33v-8Z" fill={columns === 4 ? "#333" : "#aaa"} />
                </svg>
              </li>
            </ul>
          </div>
        </div>

        <div className="short_by show_product ml-auto mb-[10px]">
          <div className="form-group flex items-center mb-0 text-right">
            <label className="text-[16px] font-bold text-[#333] mr-[17px] mb-0 whitespace-nowrap">Hiển thị :</label>
            <select 
              suppressHydrationWarning
              className="form-control border border-[#ececec] bg-transparent text-[16px] text-[#666] outline-none cursor-pointer hover:text-primary px-[15px] h-[45px] leading-normal appearance-none min-w-[92px] rounded-none bg-no-repeat"
              style={{ backgroundImage: 'url("/images/shot_arrow.svg")', backgroundPosition: '74% 48%' }}
            >
              <option>24</option>
            </select>
          </div>
        </div>
      </motion.div>
      {/* END Collection Sorting */}

      {/* START Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className={`category-products grid gap-x-[30px] gap-y-[50px] transition-all duration-300 ${
          columns === 2 ? "grid-cols-2" : 
          columns === 3 ? "grid-cols-2 md:grid-cols-3" : 
          "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        }`}>
          {filteredProducts.map((product, idx) => {
            const isLeft = Math.floor(idx / 3) % 2 === 0;
            const delay = (idx % 3) * 0.2;

            return (
              <motion.div 
                key={`${product.id}-${idx}`} 
                className="w-full"
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, delay: delay, ease: "easeOut" }}
              >
                <ProductCard product={product} priority={idx < 4} />
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-[18px] text-[#777] font-sans">Không tìm thấy sản phẩm nào trong danh mục này.</p>
          <Link href="/shop" className="text-primary underline mt-4 inline-block">Xem tất cả sản phẩm</Link>
        </div>
      )}
      {/* END Products Grid */}

      {/* START Products Pagination */}
      {filteredProducts.length > 8 && (
        <motion.div 
          className="pagination mt-[80px] pt-[40px] border-t border-[#ececec] flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        >
          <ul className="flex items-center space-x-[15px] list-none p-0 m-0">
            <li className="page-item">
              <a href="#" className="page-link w-[45px] h-[45px] border border-[#ececec] flex items-center justify-center text-[#333] hover:border-[#f74f2e] transition-all">
                <i className="flaticon-arrows-1 text-[14px]"></i>
              </a>
            </li>
            {[1, 2, 3].map((num) => (
              <li key={num} className="page-item">
                <button 
                  suppressHydrationWarning
                  className={`page-link w-[45px] h-[45px] border flex items-center justify-center text-[14px] font-bold transition-all duration-300 ${
                    num === 1 
                      ? "bg-[#f74f2e] text-white border-[#f74f2e]" 
                      : "border-[#ececec] text-[#333] hover:border-[#f74f2e] hover:text-[#f74f2e]"
                  }`}
                >
                  {num}
                </button>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link w-[45px] h-[45px] border border-[#ececec] flex items-center justify-center text-[#333] hover:border-[#f74f2e] transition-all">
                <i className="flaticon-arrows text-[14px]"></i>
              </a>
            </li>
          </ul>
        </motion.div>
      )}
      {/* END Products Pagination */}
    </div>
  );
}
