import { createClient } from '@/lib/server';
import { FilterOptions } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

const page = 1;
const pageSize = 10;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filter: FilterOptions = {
    category: searchParams.getAll('category'),
    brand: searchParams.getAll('brand')
  };
  const hasFiltersParams =
    filter.category.length > 0 || filter.brand.length > 0;
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('name', { ascending: true });

  if (hasFiltersParams) {
    query = query.in('category', [...filter.category]);
  }

  const { data: products, count } = await query.range(from, to);
  const totalCount = count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return NextResponse.json({ products }, { status: 200 });
}
