'use server';

import { Product, ServerDto } from '@/lib/types';
import { productService } from '@/services/product-service';

async function getProductsByTextAction(
  text: string,
  currentPage: number,
  totalItemsPerPage: number
): Promise<ServerDto<Product[]>> {
  return await productService.getByText(text, currentPage, totalItemsPerPage);
}

export { getProductsByTextAction };
