import { Product } from '@/lib/types';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  const data = await response.json();

  return data.products;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const response = await fetch(`/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
  const data = await response.json();

  return data.result;
}
