export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  isAvailable: boolean;
  categoryId: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CustomOrder {
  id: number;
  customerName: string;
  customerPhone: string;
  description: string;
  referenceImageUrl: string | null;
  createdAt: string;
}
