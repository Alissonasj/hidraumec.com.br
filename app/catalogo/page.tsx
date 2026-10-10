import { PaginationMeta } from '@/lib/types';
import { productService } from '@/services/product-service';
import Catalog from './components/catalog';

export default async function CatalogPage({
  searchParams
}: {
  searchParams: Promise<{
    categoria: string[];
    marca: string[];
    page: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { data, pagination } = await productService.fetchAll(currentPage, 10, {
    category: params.categoria,
    brand: params.marca
  });
  const productsToDisplay = data ?? [];
  const defaultPagination: PaginationMeta = {
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isFirstPage: true,
    isLastPage: true
  };
  const safePagination = pagination ?? defaultPagination;

  return (
    <Catalog
      products={productsToDisplay}
      pagination={safePagination}
    />
  );
}
