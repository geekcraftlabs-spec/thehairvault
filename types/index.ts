// types/index.ts
export type WigCategory = '9x6-glueless' | 'straight' | 'curls' | 'bobo' | 'double-drawn';

export interface WigColorOption {
  name: string;
  code: string;
  image: string;
  prices: Record<number, number>;
}

export interface WigSizeRange {
  label: string;
  sizes: number[];
  colors: WigColorOption[];
}

export interface WigProduct {
  id: string;
  name: string;
  category: WigCategory;
  description: string;
  featured?: boolean;
  ranges: WigSizeRange[];
}

export interface CartItem {
  productId: string;
  productName: string;
  rangeLabel: string;
  size: number;
  color: string;
  price: number;
  image: string;
  quantity: number;
}