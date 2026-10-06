import { createClient } from '@/lib/server';
import { Filter } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filter: Filter = {
    category: searchParams.getAll('category'),
    brand: searchParams.getAll('brand')
  };
  const hasFiltersParams =
    filter.category.length > 0 || filter.brand.length > 0;
  const supabase = await createClient();
  let query = supabase.from('products').select();

  if (hasFiltersParams) {
    query = query.in('category', [...filter.category]);
  }

  const { data: products } = await query;

  return NextResponse.json({ products }, { status: 200 });
}
