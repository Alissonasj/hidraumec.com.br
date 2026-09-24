import { products } from '@/lib/db';
import { Filter, Product } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filter: Filter = {
    category: searchParams.getAll('category'),
    brand: searchParams.getAll('brand')
  };

  if (filter.category.length > 0 || filter.brand.length > 0) {
    const filteredProducts = filterProducts(filter);
    return NextResponse.json({ filteredProducts }, { status: 200 });
  }

  return NextResponse.json({ products }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const result = previewProducts(data.query);

  return NextResponse.json({ result });
}

function filterProducts(filter: Filter): Product[] {
  const categories = Array.isArray(filter.category)
    ? filter.category
    : [filter.category];
  const brands = Array.isArray(filter.brand) ? filter.brand : [filter.brand];

  return products.filter(
    (product) =>
      (categories.length === 0 || categories.includes(product.category)) &&
      (brands.length === 0 || brands.includes(product.brand))
  );
}

function previewProducts(query: string) {
  if (!query.trim()) return [];

  return products
    .filter((product) =>
      `${product.name} ${product.brand} ${product.reference} ${product.slug}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .slice(0, 5);
}
