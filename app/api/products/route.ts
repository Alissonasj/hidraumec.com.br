import { products } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const result = previewProducts(data.query);

  return NextResponse.json({ result });
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
