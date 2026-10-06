import { createClient } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query')?.trim().toUpperCase() || '';
  const supabase = await createClient();
  const { data: previewProductsResult } = await supabase
    .from('products')
    .select()
    .or(
      `name.ilike.%${query}%,` +
        `brand.ilike.%${query}%,` +
        `category.ilike.%${query}%,` +
        `slug.ilike.%${query}%,` +
        `reference.cs.{${query}}`
    )
    .limit(5);

  return NextResponse.json({ previewProductsResult }, { status: 200 });
}
