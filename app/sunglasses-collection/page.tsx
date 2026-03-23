import Banner from "@/widgets/Banner";
import { Catalog } from "@/widgets/Catalog";
import { sunglassesCatalog } from "@/data/catalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunglasses",
};

export default function Men() {
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
