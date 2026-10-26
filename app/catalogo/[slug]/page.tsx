import { productService } from '@/services/product-service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from './components/product-details';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await productService.getByText(slug, 1, 1);

  if (!data)
    return {
      title: 'Peça não encontrada'
    };

  const product = data[0];

  return {
    title: `${product.name}`,
    description: `Compre ${product.name} com o melhor preço.`,
    openGraph: {
      title: `${product.name} | Hidraumec`,
      description: product.name,
      images: [{ url: product.image?.[0] ?? '', width: 1200, height: 630 }],
      type: 'website'
    },
    alternates: {
      canonical: `https://hidraumec.com.br/catalogo/${slug}`
    }
  };
}

export default async function productDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, pagination } = await productService.getByText(slug, 1, 1);
  const product = data ?? [];
  const totalCount = pagination?.totalCount ?? 0;

  if (totalCount === 0) notFound();

  return <ProductDetails product={product[0]} />;
}
