import { productService } from '@/services/product-service';
import Catalog from './components/catalog';

export default async function CatalogPage({
  searchParams
}: {
  searchParams: Promise<{
    categoria: string[];
    marca: string[];
  }>;
}) {
  const params = await searchParams;
  const { data } = await productService.fetchAll(1, 10, {
    category: params.categoria,
    brand: params.marca
  });
  const productsToDisplay = data ?? [];

  return <Catalog products={productsToDisplay} />;
}
