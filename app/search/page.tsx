import { Metadata } from "next";
import { ProductList } from "./widgets/ProductList";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <>
      <ProductList />
    </>
  );
}
