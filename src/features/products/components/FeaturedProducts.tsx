"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/core/providers/CartProvider";
import { useWishlist } from "@/core/providers/WishlistProvider";
import { useCurrency } from "@/core/providers/CurrencyProvider";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  isSoldOut?: boolean;
  oldPrice?: number;
  sizes?: string[];
  colors?: string[];
}

import { QuickViewModal } from "./QuickViewModal";
import { getproductsData } from "../services/productsService";

export function FeaturedProducts({ title }: { title: string }) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const [selectedProduct, setSelectedProduct] = React.useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [products, setProducts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await getproductsData();
      setProducts(data);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="pt-[30px] md:pt-[60px] bg-white overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <h3 className="text-[30px] font-normal text-[#333] text-center mb-[40px] capitalize">
          {title}
        </h3>

        <div className="flex flex-wrap -mx-[15px]">
          {isLoading ? (
            <div className="w-full text-center py-20 text-[#999] italic">Đang tải sản phẩm từ cửa hàng...</div>
          ) : products.length > 0 ? (
            products.map((product, index) => {
              const isSlideFromLeft = index < 4;
              const delay = (index % 4) * 0.2;

              return (
                <motion.div
                  key={product.id}
                  className="w-1/2 md:w-1/3 lg:w-1/4 px-[15px] mb-[40px]"
                  initial={{ opacity: 0, x: isSlideFromLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.3, delay: delay, ease: "easeOut" }}
                >
                  <div className="group flex flex-col featured_content">
                    <div className="relative overflow-hidden mb-5 featured_img_content">
                      <div className="relative w-full featured_img_box" style={{ aspectRatio: '270/340' }}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {product.label === "new" && (
                        <div className="absolute top-0 left-0 bg-[#333] text-white text-[12px] font-bold px-3 py-1 capitalize z-20">
                          Mới<span className="absolute -bottom-1 left-1 w-2 h-2 bg-[#333] rotate-45 transform"></span>
                        </div>
                      )}
                      {product.label === "sale" && (
                        <div className="absolute top-0 left-0 bg-[#f74f2e] text-white text-[12px] font-bold px-3 py-1 capitalize z-20">
                          Giảm giá<span className="absolute -bottom-1 left-1 w-2 h-2 bg-[#f74f2e] rotate-45 transform"></span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-full bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out z-10 pointer-events-none" />

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col items-center justify-center">
                        {product.status === "Còn hàng" ? (
                          <div className="flex flex-col space-y-[11px] w-full items-center transform translate-y-4 group-hover:-translate-y-2 transition-transform duration-200">
                            <button
                              onClick={() => addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                quantity: 1,
                                size: product.sizes?.[0]
                              })}
                              className="inline-flex items-center justify-center py-[4px] px-[28px] bg-[#f74f2e] text-white text-[14px] font-bold capitalize hover:bg-[#d12807] transition-all duration-200 text-center leading-normal"
                              suppressHydrationWarning
                            >
                              Thêm vào giỏ <i className="flaticon-arrows ml-2 text-[12px]"></i>
                            </button>
                            <Link
                              href={`/product/${product.id}`}
                              className="inline-flex items-center justify-center py-[4px] px-[28px] border border-[#f74f2e] text-[#f74f2e] text-[14px] font-bold capitalize bg-transparent hover:bg-[#f74f2e] hover:text-white transition-all duration-200 text-center leading-normal"
                              suppressHydrationWarning
                            >
                              Xem chi tiết <i className="flaticon-arrows ml-2 text-[12px]"></i>
                            </Link>
                          </div>
                        ) : (
                          <span className="inline-table py-[4px] px-[28px] bg-[#333] text-white text-[14px] font-bold capitalize text-center transform translate-y-4 group-hover:-translate-y-2 transition-transform duration-200">
                            Hết hàng
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (isInWishlist(product.id)) {
                            removeFromWishlist(product.id);
                          } else {
                            addToWishlist({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image
                            });
                          }
                        }}
                        className={`absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md z-20 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 ${isInWishlist(product.id) ? "bg-[#f74f2e] text-white" : "bg-white text-[#333] hover:bg-[#f3f4f9] hover:text-[#f74f2e]"
                          }`}
                        suppressHydrationWarning
                      >
                        <i className="flaticon-heart text-[16px]"></i>
                      </button>
                    </div>

                    <div className="text-center featured_detail_content">
                      <Link href={`/product/${product.id}`} className="block mb-1">
                        <span className="block text-[15px] text-[#333] hover:text-[#f74f2e] transition-colors capitalize font-medium">
                          {product.name}
                        </span>
                      </Link>
                      <p className="text-[18px] font-bold text-[#333] mb-3">
                        {product.oldPrice && (
                          <span className="text-[#999] line-through mr-2 font-normal text-[14px]">{formatPrice(product.oldPrice)}</span>
                        )}
                        <span>{formatPrice(product.price)}</span>
                      </p>

                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex justify-center items-center gap-[5px] featured_variyant">
                          {product.sizes.map((size: string) => (
                            <div key={size} className="radio inline-block">
                              <input
                                type="radio"
                                name={`size-${product.id}`}
                                id={`size-${product.id}-${size}`}
                                className="hidden peer"
                              />
                              <label
                                htmlFor={`size-${product.id}-${size}`}
                                className="flex items-center justify-center w-[25px] h-[28px] border border-[#aaa] text-[12px] text-[#333] uppercase cursor-pointer hover:border-[#f74f2e] hover:text-[#f74f2e] peer-checked:border-[#f74f2e] peer-checked:text-[#f74f2e] transition-all duration-200"
                              >
                                {size}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="w-full text-center py-20 text-[#999] italic">Hiện chưa có sản phẩm nào trong cửa hàng.</div>
          )}
        </div>

        {/* Quick View Modal Hook */}
        <QuickViewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      </div>
    </section>
  );
}
