export type ProductCategory = 'Accessories' | 'Electronics' | 'Home';

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: ProductCategory;
  readonly imageUrl: string;
}

export interface CartItem {
  readonly product: Product;
  readonly quantity: number;
}
