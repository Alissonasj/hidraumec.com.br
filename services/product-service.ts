import { createPublicClient } from '@/lib/public-server';
import { FilterOptions, PaginationMeta, Product, ServerDto } from '@/lib/types';
import { cacheLife, cacheTag } from 'next/cache';

async function getAll(
  currentPage = 1,
  totalItemsPerPage = 10,
  filter?: FilterOptions
): Promise<ServerDto<Product[]>> {
  'use cache';

  cacheLife('days');
  cacheTag('products', 'products-list');

  const isUndefinedFilter = filter === undefined;
  const hasFiltersParams = !isUndefinedFilter && filter?.category !== undefined;
  const from = (currentPage - 1) * totalItemsPerPage;
  const to = from + totalItemsPerPage - 1;
  const supabase = createPublicClient();

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('name', { ascending: true });

  const categories = Array.isArray(filter?.category)
    ? filter?.category
    : [filter?.category];

  if (hasFiltersParams) {
    query = query.in('category', categories);
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    return {
      success: false,
      data: null,
      error,
      pagination: null
    };
  }

  const totalCount = count ?? 0;
  const pagination = createPaginatedResponse(
    currentPage,
    totalItemsPerPage,
    totalCount
  );

  return {
    success: true,
    data,
    error: null,
    pagination
  };
}

async function getByText(
  text: string,
  currentPage = 1,
  totalItemsPerPage = 10
): Promise<ServerDto<Product[]>> {
  'use cache';

  cacheLife('days');
  cacheTag('products', `products-search`);

  text = text.trim().toUpperCase() || '';

  const from = (currentPage - 1) * totalItemsPerPage;
  const to = from + totalItemsPerPage - 1;
  const supabase = createPublicClient();
  const { data, count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('name', { ascending: true })
    .or(
      `name.ilike.%${text}%,` +
        `brand.ilike.%${text}%,` +
        `category.ilike.%${text}%,` +
        `slug.ilike.%${text}%,` +
        `reference.cs.{${text}}`
    )
    .range(from, to);

  if (error) {
    return {
      success: false,
      data: null,
      error,
      pagination: null
    };
  }

  const totalCount = count ?? 0;
  const pagination = createPaginatedResponse(
    currentPage,
    totalItemsPerPage,
    totalCount
  );

  return {
    success: true,
    data,
    error: null,
    pagination
  };
}

async function getOneBySlug(slug: string): Promise<ServerDto<Product>> {
  'use cache';

  cacheLife('minutes');
  cacheTag('products', `products-${slug}`);

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return {
      success: false,
      data: null,
      error,
      pagination: null
    };
  }

  return {
    success: true,
    data,
    error: null,
    pagination: null
  };
}

async function getAllSlugs(): Promise<
  ServerDto<Pick<Product, 'slug' | 'updatedAt'>[]>
> {
  'use cache';

  cacheLife('days');
  cacheTag('products', `products-slugs`);

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('products')
    .select('slug, updated_at')
    .order('updated_at', { ascending: true });

  if (error) {
    return {
      success: false,
      data: null,
      error,
      pagination: null
    };
  }

  return {
    success: true,
    data,
    error: null,
    pagination: null
  };
}

export const productService = {
  getAll,
  getByText,
  getOneBySlug,
  getAllSlugs
};

export function createPaginatedResponse(
  currentPage: number,
  totalItemsPerPage: number,
  totalCount: number
): PaginationMeta {
  const totalPages = Math.ceil(totalCount / totalItemsPerPage) || 1;

  return {
    currentPage,
    totalItemsPerPage,
    totalCount,
    totalPages,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
}
