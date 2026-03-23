"use client";

import Fuse from "fuse.js";
import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { products } from "@/data/catalog";
import { ProductCard } from "@/widgets/ProductCard";
import { Container } from "@/components/Container";

export const ProductList = () => {
  const query = useAppSelector((state) => state.search.query);

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["title", "collection"],
      threshold: 0.4,
    });
  }, []);

  const filteredProducts = query
    ? fuse.search(query).map((r) => r.item)
    : products;

  return (
    <Container className="py-10">
      {query && (
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Search results for{" "}
          <span className="text-gray-900 font-bold">“{query}”</span>
        </h1>
      )}

      {!filteredProducts.length ? (
        <p className="text-gray-500 text-lg">
          No products found for <span className="font-medium">“{query}”</span>
        </p>
      ) : (
        <div className="flex flex-wrap gap-10">
          {filteredProducts.map((p) => (
            <ProductCard card={p} key={p.id} />
          ))}
        </div>
      )}
    </Container>
  );
};
