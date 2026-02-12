"use client";

import { Container } from "@/components/Container";
import { CatalogProps } from "@/types/catalogData";
import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";

export const Catalog = ({ catalogData }: { catalogData: any }) => {
  const [showMore, setShowMore] = useState(4);
  return (
    <div className="py-30">
      <Container className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {catalogData.slice(0, showMore).map((card: Product) => (
          <ProductCard key={card.id} card={card} />
        ))}
      </Container>
      {catalogData.length > 6 && (
        <div>
          {showMore < catalogData.length ? (
            <button
              onClick={() => setShowMore(showMore + 4)}
              className="bg-black rounded-3xl border border-transparent text-white font-medium text-lg py-3 px-8 block mx-auto mt-15 cursor-pointer xl:hover:bg-transparent xl:hover:border-black xl:hover:text-black transition-all duration-300
      "
            >
              Load More
            </button>
          ) : (
            <button
              onClick={() => setShowMore(4)}
              className="bg-black rounded-3xl border border-transparent text-white font-medium text-lg py-3 px-8 block mx-auto mt-15 cursor-pointer xl:hover:bg-transparent xl:hover:border-black xl:hover:text-black transition-all duration-300
      "
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};
