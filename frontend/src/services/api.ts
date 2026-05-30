import type { Category, Product, CustomOrder } from '../types';

const BASE_URL = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  return request<Category[]>('/categories');
}

export async function getProducts(categoryId?: number): Promise<Product[]> {
  const params = categoryId ? `?categoryId=${categoryId}` : '';
  return request<Product[]>(`/products${params}`);
}

export async function getProduct(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`);
}

export async function createCustomOrder(data: FormData): Promise<CustomOrder> {
  const res = await fetch(`${BASE_URL}/custom-orders`, {
    method: 'POST',
    body: data,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return res.json();
}
