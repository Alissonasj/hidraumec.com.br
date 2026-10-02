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
  const hasFilters = Object.keys(params).length > 0;
  let filteredProducts: Product[] = [];

  if (hasFilters) {
    filteredProducts = await productService.searchByFilter({
      category: params.categoria,
      brand: params.marca
    });
  }

  const hasFilteredProducts = filteredProducts.length > 0;
  const productsToDisplay = hasFilteredProducts
    ? filteredProducts
    : allProducts;

  return <Catalog products={productsToDisplay} />;
}
