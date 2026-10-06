import ProductCard from '@/components/product-card';
import { LinksPath } from '@/lib/links-path';
import { productService } from '@/services/product-service';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search: rawSearch } = await searchParams;
  const search = rawSearch?.trim() ?? '';
  const productsResults = await productService.search(search);

  return (
    <main className='min-h-screen bg-[#f8f9fa] text-slate-900'>
      <div className='mx-auto max-w-360 px-5 py-6 lg:px-10 lg:py-8'>
        <section className='mb-5 flex flex-col gap-4 border-b border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-start gap-3'>
            <span className='flex size-9 shrink-0 items-center justify-center bg-red-50 text-red-700'>
              <MagnifyingGlassIcon className='size-5' />
            </span>
            <div className='min-w-0'>
              <p className='mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500'>
                Resultado da pesquisa
              </p>
              <h1 className='wrap-break-word font-heading text-xl font-bold leading-tight'>
                {search || 'Todas as peças'}
              </h1>
            </div>
          </div>
          <p className='shrink-0 text-xs text-slate-500'>
            <span className='font-bold text-slate-900'>
              {productsResults.length}
            </span>{' '}
            {productsResults.length === 1
              ? 'item encontrado'
              : 'itens encontrados'}
          </p>
        </section>

        {productsResults.length > 0 ? (
          <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
            {productsResults.map((product) => (
              <Link
                key={product.id}
                href={`${LinksPath.CATALOGO}/${product.slug}`}
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        ) : (
          <section className='flex min-h-56 flex-col items-center justify-center border border-dashed border-slate-300 bg-white px-5 py-12 text-center'>
            <MagnifyingGlassIcon className='mb-3 size-8 text-slate-300' />
            <h2 className='font-heading text-base font-bold text-slate-800'>
              Nenhuma peça encontrada
            </h2>
            <p className='mt-2 max-w-md text-sm leading-relaxed text-slate-500'>
              Tente buscar por outro nome, marca ou referência.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
