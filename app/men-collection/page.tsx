import Banner from "@/widgets/Banner";
import { Catalog } from "./widgets/Catalog";

export default function Men() {
  return (
    <>
      <Banner
        title="Men Collection"
        description="Discover curated pieces that embody heritage, craftsmanship, and quiet sophistication."
        bgClass="bg-men"
      />
      <Catalog />
    </>
  );
}
