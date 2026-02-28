export interface Product {
  id: number;
  title: string;
  src: string;
  price: string;
  collection: string;
}

export interface CartItem extends Product {
  quantity: number;
}
