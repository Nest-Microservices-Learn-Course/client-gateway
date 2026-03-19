export interface Product {
  id: string;
  name: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}
