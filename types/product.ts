export interface ProductSize {
  id: number;
  label: string;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  src: string;
  price: string;
  isNew: boolean;
  collection: string;
  sizes: ProductSize[];
}

export interface CartProduct extends Product {
  quantity: number;
}
