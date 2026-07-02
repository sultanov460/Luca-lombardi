export interface Product {
  id: string;
  title: string;
  src: string;
  price: string;
  isNew: boolean;
  collection: string;
}

export type Size = "S" | "M" | "L";

export interface CartProduct extends Product {
  quantity: number;
  size: Size;
}
