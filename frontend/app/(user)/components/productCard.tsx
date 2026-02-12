"use client";
import React from "react";
import { Star, Heart, ShoppingCart, Eye, Zap, Truck } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/app/utils/slugify";
import { useAppDispatch } from "@/app/lib/store/store";
import { addToCart } from "@/app/lib/store/features/cartSlice";
import { getImageUrl } from "@/app/utils/getImageUrl";
import { Cagliostro } from "next/font/google";
import { json } from "stream/consumers";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: string;
  originalPrice: string;
  rating: number;
  discount: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  paymentMethods: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  discount,
  isFavorite,
  paymentMethods,
  onToggleFavorite,
}) => {
  const dispatch = useAppDispatch();
  const discountAmount = (
    parseFloat(originalPrice) - parseFloat(price)
  ).toFixed(0);

  return (
    <Link href={`/products/${slugify(name)}/${id}`}>
      <div className="group relative amazon-card bg-white rounded-xl sm:rounded-3xl shadow-sm sm:border amz-border-light overflow-hidden transition-all duration-700 hover:shadow-2xl hover:border-blue-200/50 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30">
        {/* Enhanced Discount Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="amazon-badge">
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-white" />
              {discount}% OFF
            </span>
          </div>
        </div>

        <div className="relative h-32 sm:h-64 overflow-hidden bg-gray-50">
          <img
            src={getImageUrl(image)}
            alt={name}
            className="w-full h-full object-cover"
          />

          {/* Enhanced overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Premium Badge */}
          {rating >= 4.5 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              ⭐ Premium Choice
            </div>
          )}

          {/* Enhanced Quick Action Buttons */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <button className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 border border-gray-100/50 group/quick">
              <Eye size={18} className="amz-quick" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(
                  addToCart({
                    id: id,
                    name: name,
                    price: parseFloat(price),
                    quantity: 1,
                    imageUrl: image || "",
                    paymentMethods: paymentMethods,
                  }),
                );
              }}
              className="amz-btn p-3 rounded-2xl shadow-xl transition-all duration-300 group/add"
            >
              <ShoppingCart
                size={18}
                className="group-hover/add:rotate-12 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Enhanced Product Info */}
        <div className="p-2 sm:p-5 space-y-0">
          {/* Product Name */}
          <div className="text-left  space-y-2">
            <h3 className=" text-xs text-gray-900 amz-title transition-colors duration-300 truncate sm:text-base leading-snug tracking-tight">
              {name}
            </h3>

            {/* Free shipping indicator */}
          </div>

          {/* Enhanced Price Section */}
          <div className="flex  items-center sm:items-end justify-between ">
            <div className="text-left sm:text-center">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-center gap-1 sm:gap-3">
                {/* Selling Price */}
                <span className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  ₹{price}
                </span>

                {/* MRP */}
                <span className="text-xs sm:text-sm text-gray-500">
                  MRP
                  <span className="ml-1 line-through font-medium">
                    ₹{originalPrice}
                  </span>
                </span>
              </div>

              {/* Savings */}
            </div>

            {/* Enhanced Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(
                  addToCart({
                    id: id,
                    name: name,
                    price: parseFloat(price),
                    quantity: 1,
                    imageUrl: image || "",
                    paymentMethods: paymentMethods,
                  }),
                );
              }}
              className="hidden md:flex amz-btn text-xs sm:p-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group/cart"
            >
              <ShoppingCart className="relative group-hover/cart:rotate-12 transition-transform duration-300" />
            </button>
          </div>


        </div>

        {/* Enhanced Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1200 ease-out" />

        {/* Amazon-like corner */}
        <div className="amazon-corner" aria-hidden>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white" />
          </svg>
        </div>

        {/* Subtle border glow on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10" />
      </div>
    </Link>
  );
};

export default ProductCard;
