import Banner from "@/widgets/Banner";
import { Catalog } from "@/widgets/Catalog";
import { womenCatalog } from "@/data/catalog";

export default function WomenCollection() {
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
