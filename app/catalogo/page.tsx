import { Product } from '@/lib/types';
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
  const allProducts = await productService.fetchAll();
  const params = await searchParams;
  let filteredProducts: Product[] | undefined = undefined;

  if (Object.keys(params).length > 0) {
    filteredProducts = await productService.searchByFilter({
      category: params.categoria,
      brand: params.marca
    });
  }

  return <Catalog products={filteredProducts || allProducts} />;
}
