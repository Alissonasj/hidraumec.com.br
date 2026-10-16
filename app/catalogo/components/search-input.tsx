'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LinksPath } from '@/lib/links-path';
import { Product } from '@/lib/types';
import { productService } from '@/services/product-service';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, SubmitEvent, useState } from 'react';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [previewProductsData, setPreviewProductsData] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const route = useRouter();

  function submitSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (query) {
      route.push(`${LinksPath.PESQUISA}?search=${query.trim()}`);
    }

    setQuery('');
  }

  async function handleOnChangeInputSearch(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) {
    const query = event.target.value;
    setQuery(query);

    // Aplicar debounce
    const { data } = await productService.search(query, 1, 3);
    const previewProductsResult = data ?? [];

    setPreviewProductsData(previewProductsResult);
  }

  function handleClick(slug: string) {
    route.push(`${LinksPath.CATALOGO}/${slug}`);
    setQuery('');
  }

  return (
    <form
      className='relative ml-auto w-full max-w-92.5'
      onSubmit={submitSearch}
    >
      <div className='flex bg-slate-100'>
        <MagnifyingGlassIcon className='ml-4 mt-3.5 size-4 shrink-0 text-slate-500' />
        <Input
          value={query}
          onChange={handleOnChangeInputSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type='search'
          placeholder='Buscar peças...'
          className='h-11 rounded-none border-0 bg-transparent pl-3'
          aria-label='Buscar peças'
        />
        <Button
          type='submit'
          className='h-11 rounded-none bg-red-700 px-4 text-xs font-bold uppercase hover:bg-red-800'
        >
          Pesquisar
        </Button>
      </div>
      {query.trim() && query.trim() !== submittedQuery && (
        <div className='absolute left-0 right-0 top-full z-20 border border-t-0 border-slate-200 bg-white shadow-lg'>
          {isFocused &&
            (previewProductsData.length > 0 ? (
              <ul className='divide-y divide-slate-100'>
                {previewProductsData.map((product) => (
                  <li key={product.id}>
                    {/* Alterar para Link e remover a função handleClick() */}
                    <button
                      type='button'
                      className='flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 cursor-pointer'
                      onClick={() => {
                        handleClick(product.slug);
                      }}
                    >
                      <span className='flex size-12 shrink-0 items-center justify-center overflow-hidden bg-slate-50'>
                        <Image
                          src={product.image?.[0] || '#'}
                          alt={product.name}
                          width={500}
                          height={500}
                          className='w-96! shrink-0 scale-[0.3]'
                        />
                      </span>
                      <span className='min-w-0'>
                        <span className='block truncate text-xs font-bold text-slate-800'>
                          {product.name}
                        </span>
                        <span className='mt-1 block text-[10px] uppercase tracking-[0.08em] text-slate-500'>
                          {product.brand} · Ref: {product.reference}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='px-4 py-3 text-xs text-slate-500'>
                Nenhuma peça encontrada.
              </p>
            ))}
        </div>
      )}
    </form>
  );
}
