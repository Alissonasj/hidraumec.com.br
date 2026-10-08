import { productService } from '@/services/product-service';
import { notFound } from 'next/navigation';
import ProductDetails from './components/product-details';

export default async function productDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, pagination } = await productService.search(slug, 1, 1);
  const product = data ?? [];
  const totalCount = pagination?.totalCount ?? 0;

  if (totalCount === 0) notFound();

  return <ProductDetails product={product[0]} />;
}
