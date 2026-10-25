import { MetadataRoute } from 'next';
import { productService } from './services/product-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://hidraumec.com.br';
  const { data: products } = await productService.getAllSlugs();
  const safeProducts = products ?? [];
  const productsEntries: MetadataRoute.Sitemap = safeProducts.map(
    (product) => ({
      url: `${BASE_URL}/catalogo/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: 'daily',
      priority: 0.9
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${BASE_URL}/catalogo`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/servicos`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7
    },
    ...productsEntries
  ];
}
