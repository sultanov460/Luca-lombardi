export type CatalogItem = {
  id: number;
  title: string;
  src: string;
  price: string;
  isNew: boolean;
  collection: string;
};

export type CatalogProps = {
  menCollection: CatalogItem[];
  womenCollection: CatalogItem[];
};
