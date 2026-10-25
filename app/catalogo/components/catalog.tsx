'use client';

import PaginationRender from '@/components/pagination-render';
import ProductCard from '@/components/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { useUrlParams } from '@/hooks/useUrlParams';
import { LinksPath } from '@/lib/links-path';
import {
  electricSystemOptions,
  engineSystemOptions,
  PaginationMeta,
  Product
} from '@/lib/types';
import {
  FunnelIcon,
  ListIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
  XIcon
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';
import { FilterSection } from './filter-section';

function Filters({
  selectedCategories,
  toggleCategory,
  clear
}: {
  selectedCategories: string[];
  toggleCategory: (value: string) => void;
  clear: () => void;
}) {
  return (
    <div className='space-y-7'>
      <div className='flex items-center justify-between'>
        <h2 className='font-heading text-lg font-bold text-slate-900'>
          Filtros
        </h2>
        <button
          className='text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 hover:text-red-700'
          onClick={clear}
        >
          Limpar
        </button>
      </div>
      <Separator />
      <FilterSection
        title='Sistema do Motor'
        options={engineSystemOptions}
        selected={selectedCategories}
        onToggle={toggleCategory}
        defaultOpen={true}
      />
      <FilterSection
        title='Sistema Elétrico'
        options={electricSystemOptions}
        selected={selectedCategories}
        onToggle={toggleCategory}
      />
      <Separator />
      <div className='space-y-3'>
        <label
          className='text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700'
          htmlFor='machine-model'
        >
          Modelo da máquina
        </label>
        <div className='relative'>
          <MagnifyingGlassIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
          <Input
            id='machine-model'
            placeholder='Ex: 320D, EC210...'
            className='h-10 pl-9'
          />
        </div>
      </div>
    </div>
  );
}

type CatalogProps = {
  products: Product[];
  pagination: PaginationMeta;
};

export default function Catalog({ products, pagination }: CatalogProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const {
    setUrlSearchParams,
    clearAllUrlSearchParams,
    clearOneUrlSeachParams
  } = useUrlParams();

  function toggle(
    value: string,
    setter: (values: string[]) => void,
    current: string[]
  ) {
    const nextValues = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    setter(nextValues);
    return nextValues;
  }

  function toggleCategory(value: string) {
    const nextCategories = toggle(
      value,
      setSelectedCategories,
      selectedCategories
    );
    setUrlSearchParams('categoria', nextCategories);
    clearAllUrlSearchParams(['page']);
  }

  function clearFilters() {
    setSelectedCategories([]);
    clearAllUrlSearchParams(['categoria', 'page']);
  }

  return (
    <div className='min-h-screen bg-[#f8f9fa] text-slate-900'>
      <main
        id='catalogo'
        className='mx-auto max-w-360 px-5 py-6 lg:px-10 lg:py-8'
      >
        <div className='mb-5 flex items-center justify-between lg:hidden'>
          <p className='text-sm text-slate-500'>Catálogo de peças</p>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant='outline'
                  size='sm'
                />
              }
            >
              <FunnelIcon /> Filtros
            </SheetTrigger>
            <SheetContent
              side='left'
              className='w-[85%] overflow-y-auto p-5'
            >
              <SheetHeader className='p-0 pb-6'>
                <SheetTitle>Filtrar catálogo</SheetTitle>
              </SheetHeader>
              <Filters
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                clear={clearFilters}
              />
            </SheetContent>
          </Sheet>
        </div>
        <div className='grid gap-8 lg:grid-cols-[240px_1fr]'>
          <aside className='hidden self-start lg:sticky lg:top-8 lg:block'>
            <Filters
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              clear={clearFilters}
            />
          </aside>

          <section>
            <div className='mb-5 flex flex-col gap-4 border-b border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-3'>
                <span className='flex size-9 items-center justify-center bg-red-50 text-red-700'>
                  <FunnelIcon className='size-5' />
                </span>
                <div>
                  <h1 className='font-heading text-xl font-bold'>
                    Catálogo de Peças
                  </h1>
                  <p className='text-xs text-slate-500'>
                    {products.length} itens encontrados
                  </p>
                </div>
              </div>
              {/* Layout Grid/List */}
              <div className='flex items-center gap-1 self-end border border-slate-200 p-1'>
                <Button
                  type='button'
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size='icon-sm'
                  aria-label='Exibir em grade'
                  aria-pressed={viewMode === 'grid'}
                  title='Exibir em grade'
                  onClick={() => setViewMode('grid')}
                >
                  <SquaresFourIcon />
                </Button>
                <Button
                  type='button'
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size='icon-sm'
                  aria-label='Exibir em lista'
                  aria-pressed={viewMode === 'list'}
                  title='Exibir em lista'
                  onClick={() => setViewMode('list')}
                >
                  <ListIcon />
                </Button>
              </div>
            </div>
            <div className='mb-5 flex flex-wrap gap-2'>
              {selectedCategories.map((tag) => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='gap-2 rounded-full px-3 py-1 font-normal'
                >
                  {tag}
                  <button
                    onClick={() => {
                      if (
                        [
                          ...engineSystemOptions,
                          ...electricSystemOptions
                        ].includes(tag)
                      ) {
                        toggle(tag, setSelectedCategories, selectedCategories);
                        clearOneUrlSeachParams('categoria', tag);
                      }
                    }}
                    aria-label={`Remover filtro ${tag}`}
                  >
                    <XIcon />
                  </button>
                </Badge>
              ))}
            </div>
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid gap-5'
              }
            >
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`${LinksPath.CATALOGO}/${product.slug}`}
                >
                  <ProductCard
                    product={product}
                    viewMode={viewMode}
                  />
                </Link>
              ))}
            </div>
            {products.length === 0 && (
              <div className='border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500'>
                Nenhuma peça encontrada para os filtros selecionados.
              </div>
            )}
            {pagination.totalCount > 10 && (
              <PaginationRender pagination={pagination} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
