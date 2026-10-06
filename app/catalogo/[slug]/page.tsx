import { productService } from '@/services/product-service';
import { notFound } from 'next/navigation';
import ProductDetails from './components/product-details';

export default async function productDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await productService.search(slug);

  if (product.length === 0) notFound();

  return <ProductDetails product={product[0]} />;
}
