import Banner from "@/widgets/Banner";
import { Catalog } from "@/widgets/Catalog";
import { getProductsByCollection } from "@/lib/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunglasses",
};

export default async function Sunglasses() {
  const sunglassesCatalog = await getProductsByCollection(
    "sunglasses-collection",
  );

  return (
    <>
      <Banner
        title="Sunglasses Collection"
        description="Timeless silhouettes. Modern attitude. Sunglasses that elevate your look."
        bgClass="bg-sunglasses"
      />
      <Catalog catalogData={sunglassesCatalog} />
    </>
  );
}
