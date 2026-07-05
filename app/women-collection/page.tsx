import Banner from "@/widgets/Banner";
import { Catalog } from "@/widgets/Catalog";
import { getProductsByCollection } from "@/lib/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women Collection",
};

export default async function WomenCollection() {
  const womenCatalog = await getProductsByCollection("women-collection");

  return (
    <>
      <Banner
        title="Women Collection"
        description="Discover curated pieces that embody heritage, craftsmanship, and quiet sophistication."
        bgClass="bg-women"
      />
      <Catalog catalogData={womenCatalog} />
    </>
  );
}
