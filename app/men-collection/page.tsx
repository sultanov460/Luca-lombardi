import Banner from "@/widgets/Banner";
import { Catalog } from "@/widgets/Catalog";
import { getProductsByCollection } from "@/lib/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men Collection",
};

export default async function Men() {
  const menCatalog = await getProductsByCollection("men-collection");

  return (
    <>
      <Banner
        title="Men Collection"
        description="Discover curated pieces that embody heritage, craftsmanship, and quiet sophistication."
        bgClass="bg-men"
      />
      <Catalog catalogData={menCatalog} />
    </>
  );
}
