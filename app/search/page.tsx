import { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProductList } from "./widgets/ProductList";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage() {
  const products = await getAllProducts();

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
