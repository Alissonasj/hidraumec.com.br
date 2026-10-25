import { createClient } from '@/lib/client';
import { FilterOptions, PaginationMeta, Product, ServerDto } from '@/lib/types';

// CRIAR SERVIÇOS QUE RETORNEM APENAS UM PRODUTO EX.: FIND ONE BY. DEPOIS RENOMAR AS FUNÇÕES EXISTENTES PARA ALGO MAIS SEMÂTICO

async function fetchAll(
  currentPage = 1,
  pageSize = 10,
  filter?: FilterOptions
): Promise<ServerDto<Product[]>> {
  const isUndefinedFilter = filter === undefined;
  const hasFiltersParams = !isUndefinedFilter && filter?.category !== undefined;
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = createClient();

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

  return {
    success: true,
    data,
    error: null,
    pagination: createPaginatedResponse(currentPage, pageSize, totalCount)
  };
}

async function search(
  text: string,
  currentPage = 1,
  pageSize = 10
): Promise<ServerDto<Product[]>> {
  text = text.trim().toUpperCase() || '';

  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = createClient();
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

  return {
    success: true,
    data,
    error: null,
    pagination: createPaginatedResponse(currentPage, pageSize, totalCount)
  };
}

async function getAllSlugs(): Promise<
  ServerDto<Pick<Product, 'slug' | 'updatedAt'>[]>
> {
  const supabase = createClient();
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
  fetchAll,
  search,
  getAllSlugs
};

export function createPaginatedResponse(
  currentPage: number,
  pageSize: number,
  totalCount: number
): PaginationMeta {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return {
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
}
