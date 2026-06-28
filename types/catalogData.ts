export type CatalogItem = {
  id: string;
  title: string;
  src: string;
  price: string;
  isNew: boolean;
  collection: string;
};

export type CatalogProps = {
  menCollection: CatalogItem[];
  womenCollection: CatalogItem[];
  sunglassesCollection: CatalogItem[];
};
