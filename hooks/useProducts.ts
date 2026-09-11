import { Product } from '@/lib/types';
import { useEffect, useState } from 'react';

export function useProducts() {
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProductsData(data.products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return { productsData };
}
