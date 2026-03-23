import Banner from "@/widgets/Banner";
import { Catalog } from "@/widgets/Catalog";
import { menCatalog } from "@/data/catalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men Collection",
};

export default function Men() {
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
