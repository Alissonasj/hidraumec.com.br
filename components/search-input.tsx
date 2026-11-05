'use client';

import { getProductsByTextAction } from '@/actions/product-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { LinksPath } from '@/lib/links-path';
import { Product } from '@/lib/types';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  FocusEvent,
  SubmitEvent,
  Suspense,
  use,
  useEffect,
  useState
} from 'react';

type PreviewProductsResult = {
  products: Product[];
  success: boolean;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  } | null;
};

function SearchPreviewResults({
  results,
  onProductClick
}: {
  results: Promise<PreviewProductsResult>;
  onProductClick: () => void;
}) {
  const { products, success } = use(results);

  if (!success) {
    return (
      <p className='px-4 py-3 text-xs text-red-700'>
        Não foi possível carregar os resultados. Tente novamente.
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className='px-4 py-3 text-xs text-slate-500'>
        Nenhuma peça encontrada.
      </p>
    );
  }

  return (
    <ul className='divide-y divide-slate-100'>
      {products.map((product) => (
        <li key={product.id}>
          <Link
            onClick={onProductClick}
            href={`${LinksPath.CATALOGO}/${product.slug}`}
            className='flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-slate-50'
          >
            <span className='flex size-12 shrink-0 items-center justify-center overflow-hidden bg-slate-50'>
              <Image
                src={product.images?.[0] || '#'}
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
                {product.brand} · Ref: {product.references}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState('');
  const [previewResults, setPreviewResults] =
    useState<Promise<PreviewProductsResult> | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const route = useRouter();

  useEffect(() => {
    if (!searchValue.trim()) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const results = getProductsByTextAction(searchValue, 1, 3).then(
        ({ data, success, error }) => ({
          products: data ?? [],
          success,
          error
        })
      );

      setPreviewResults(results);
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  function submitSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchValue.trim().length > 0) {
      route.push(`${LinksPath.PESQUISA}/${searchValue}`);
    }

    inputClear();
  }

  function handleOnChangeInputSearch(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) {
    const inputSearchValue = event.target.value;
    setPreviewResults(null);
    setSearchValue(inputSearchValue);
  }

  function inputClear() {
    setSearchValue('');
    setPreviewResults(null);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur(event: FocusEvent<HTMLFormElement, Element>) {
    if (
      !(event.relatedTarget instanceof Node) ||
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      setIsFocused(false);
    }
  }

  return (
    <form
      className='relative ml-auto w-full max-w-92.5'
      onSubmit={submitSearch}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className='flex bg-slate-100'>
        <MagnifyingGlassIcon className='ml-4 mt-3.5 size-4 shrink-0 text-slate-500' />
        <Input
          value={searchValue}
          onChange={handleOnChangeInputSearch}
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
      {searchValue.trim() && isFocused && (
        <div className='absolute left-0 right-0 top-full z-20 border border-t-0 border-slate-200 bg-white shadow-lg'>
          {previewResults && (
            <Suspense
              fallback={
                <div className='flex items-center justify-center px-4 py-4'>
                  <Spinner
                    className='size-5 text-red-700'
                    aria-label='Carregando resultados'
                  />
                </div>
              }
            >
              <SearchPreviewResults
                results={previewResults}
                onProductClick={inputClear}
              />
            </Suspense>
          )}
        </div>
      )}
    </form>
  );
}
