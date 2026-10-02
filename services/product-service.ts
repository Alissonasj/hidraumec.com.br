import { baseUrl } from '@/lib/base-url';
import { Filter, Product } from '@/lib/types';

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

async function searchByFilter(filter: Filter): Promise<Product[]> {
  const url = new URL(`${baseUrl()}/api/products`);

  if (Object.keys(filter).length > 0) {
    if (Array.isArray(filter.category)) {
      filter.category.forEach((cat) =>
        url.searchParams.append('category', cat)
      );
    } else if (filter.category !== undefined) {
      url.searchParams.append('category', filter.category);
    }

    if (Array.isArray(filter.brand)) {
      filter.brand.forEach((cat) => url.searchParams.append('brand', cat));
    } else if (filter.brand !== undefined) {
      url.searchParams.append('brand', filter.brand);
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.filteredProducts;
  }

  return [];
}

export const productService = {
  fetchAll,
  search,
  searchByFilter
};
