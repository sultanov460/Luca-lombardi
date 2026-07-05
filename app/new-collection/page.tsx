import { getProductsByCollection } from "@/lib/products";
import Banner from "@/widgets/Banner";
import NewCollectionList from "@/widgets/NewCollection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Collection",
};

export default async function NewCollectionPage() {
  const [menCatalog, womenCatalog, sunglassesCatalog] = await Promise.all([
    getProductsByCollection("men-collection"),
    getProductsByCollection("women-collection"),
    getProductsByCollection("sunglasses-collection"),
  ]);

  return (
    <div>
      <Banner
        title="New Collection"
        description="A new collection shaped by modern elegance — contemporary pieces for men and women, crafted with attention to detail and form."
        bgClass="bg-newCollection"
      />

      <NewCollectionList
        title="For men"
        delay={3000}
        collections={menCatalog}
      />
      <NewCollectionList
        title="For wooman"
        delay={3500}
        collections={womenCatalog}
      />
      <NewCollectionList
        title="Sunglasses"
        delay={4000}
        collections={sunglassesCatalog}
      />
    </div>
  );
}
