import { baseUrl } from '@/lib/base-url';
import { Product } from '@/lib/types';

async function fetchAll(): Promise<Product[]> {
  const response = await fetch(`${baseUrl()}/api/products`);
  const data = await response.json();

  return data.products;
}

async function search(query: string): Promise<Product[]> {
  const response = await fetch(`${baseUrl()}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
  const data = await response.json();

  return data.result;
}

export const productService = {
  fetchAll,
  search
};
