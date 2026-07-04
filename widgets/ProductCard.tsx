"use client";

import { Product } from "@/types/product";
import Link from "next/link";

interface Props {
  card: Product;
}

export const ProductCard = ({ card }: Props) => {
  return (
    <div className="group">
      <Link
        href={`/${card.collection}/${card.id}`}
        className="flex flex-col items-center justify-center text-center max-w-85 mx-auto"
      >
        {/* Image container */}
        <div className="relative w-full overflow-hidden rounded-xl">
          {/* Image with animation */}
          <img
            src={card.src}
            alt={card.title}
            className="h-auto xl:h-100 object-cover rounded-xl w-full shadow-2xl transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Enhanced NEW badge */}
          {card.isNew && (
            <span className="absolute top-2 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              NEW
            </span>
          )}
        </div>

        {/* Product info */}
        <div className="flex items-center justify-between mt-4 w-full px-2">
          <h2 className="text-sm font-medium text-neutral-900 group-hover:text-black transition-colors">
            {card.title}
          </h2>
          <span className="text-sm font-semibold text-neutral-900">
            {card.price}
          </span>
        </div>
      </Link>
    </div>
  );
};
