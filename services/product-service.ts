import { apiUrl } from '@/lib/base-url';
import { Filter, Product } from '@/lib/types';

async function fetchAll(): Promise<Product[]> {
  const response = await fetch(apiUrl('/api/products'));
  const data = await response.json();

  return data.products;
}

async function search(query: string): Promise<Product[]> {
  const url = apiUrl('/api/products/search');
  url.searchParams.set('query', query);
  const response = await fetch(url);
  const data = await response.json();

  return data.previewProductsResult || [];
}

async function searchByFilter(filter: Filter): Promise<Product[]> {
  const url = apiUrl('/api/products');
  const hasFilters = Object.keys(filter).length > 0;

  if (hasFilters) {
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

    return data.products;
  }

  return [];
}

export const productService = {
  fetchAll,
  search,
  searchByFilter
};
