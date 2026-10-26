import { defaultPagination } from '@/lib/types';
import { productService } from '@/services/product-service';
import { Metadata } from 'next';
import Catalog from './components/catalog';

export const metadata: Metadata = {
  title: 'Catálogo de Peças'
};

export default async function CatalogPage({
  searchParams
}: {
  searchParams: Promise<{
    categoria: string[];
    marca: string[];
    page: string;
  }>;
}) {
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;
  const { data, pagination } = await productService.getAll(currentPage, 10, {
    category: sParams.categoria,
    brand: sParams.marca
  });
  const productsToDisplay = data ?? [];
  const safePagination = pagination ?? defaultPagination;

  return (
    <Catalog
      products={productsToDisplay}
      pagination={safePagination}
    />
  );
}
