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
  const { data: product } = await productService.getOneBySlug(slug);

  if (!product)
    return {
      title: 'Peça não encontrada'
    };

  return {
    title: `${product.name}`,
    description: `Compre ${product.name} com o melhor preço.`,
    openGraph: {
      title: `${product.name} | Hidraumec`,
      description: product.name,
      images: [{ url: product.images?.[0] ?? '', width: 1200, height: 630 }],
      type: 'website'
    },
    alternates: {
      canonical: `https://hidraumec.com.br/catalogo/${slug}`
    }
  };
}

type ProductDetailsProps = {
  params: Promise<{ slug: string }>;
};

async function ProductDetailsDataFetch({ params }: ProductDetailsProps) {
  const { slug } = await params;
  const { data: product } = await productService.getOneBySlug(slug);

  if (product === null) notFound();

  return <ProductDetails product={product} />;
}

export default function ProductDetailsPage({ params }: ProductDetailsProps) {
  return <ProductDetailsDataFetch params={params} />;
}
