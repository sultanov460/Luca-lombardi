import { menCatalog, sunglassesCatalog, womenCatalog } from "@/data/catalog";
import Banner from "@/widgets/Banner";
import { NewCollectionList } from "@/widgets/NewCollection";

export default function NewCollectionPage() {
  return (
    <div>
      <Banner
        title="New Collection"
        description="A new collection shaped by modern elegance — contemporary pieces for men and women, crafted with attention to detail and form."
        bgClass="bg-newCollection"
      />

      <NewCollectionList
        menCollection={menCatalog}
        womenCollection={womenCatalog}
        sunglassesCollection={sunglassesCatalog}
      />
    </div>
  );
}
