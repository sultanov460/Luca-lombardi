export interface Product {
  id: number;
  title: string;
  src: string;
  price: string;
  isNew: boolean;
  collection: string;
}

export interface CartProduct extends Product {
  quantity: number;
}
