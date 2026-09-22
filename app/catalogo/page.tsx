'use client';

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
import { useProducts } from '@/hooks/useProducts';
import { useUrlParams } from '@/hooks/useUrlParams';
import { brands, categories } from '@/lib/db';
import { LinksPath } from '@/lib/links-path';
import {
  FunnelIcon,
  ListIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
  XIcon
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';
import { FilterSection } from './components/filter-section';

function Filters({
  selectedCategories,
  selectedBrands,
  toggleCategory,
  toggleBrand,
  clear
}: {
  selectedCategories: string[];
  selectedBrands: string[];
  toggleCategory: (value: string) => void;
  toggleBrand: (value: string) => void;
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
        title='Categoria'
        options={categories}
        selected={selectedCategories}
        onToggle={toggleCategory}
      />
      <Separator />
      <FilterSection
        title='Marca'
        options={brands}
        selected={selectedBrands}
        onToggle={toggleBrand}
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

export default function CatalogPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { productsData } = useProducts();
  const { setUrlSearchParams, clearUrlSearchParams } = useUrlParams();

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
  }

  function toggleBrand(value: string) {
    const nextBrands = toggle(value, setSelectedBrands, selectedBrands);
    setUrlSearchParams('marca', nextBrands);
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedBrands([]);
    clearUrlSearchParams(['marca', 'categoria']);
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
                selectedBrands={selectedBrands}
                toggleCategory={toggleCategory}
                toggleBrand={toggleBrand}
                clear={clearFilters}
              />
            </SheetContent>
          </Sheet>
        </div>
        <div className='grid gap-8 lg:grid-cols-[240px_1fr]'>
          <aside className='hidden self-start lg:sticky lg:top-8 lg:block'>
            <Filters
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              toggleCategory={toggleCategory}
              toggleBrand={toggleBrand}
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
                    {productsData.length} itens encontrados
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
              {[...selectedCategories, ...selectedBrands].map((tag) => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='gap-2 rounded-full px-3 py-1 font-normal'
                >
                  {tag}
                  <button
                    onClick={() =>
                      categories.includes(tag)
                        ? toggle(tag, setSelectedCategories, selectedCategories)
                        : toggle(tag, setSelectedBrands, selectedBrands)
                    }
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
              {productsData.map((product) => (
                <Link
                  key={product.reference}
                  href={`${LinksPath.CATALOGO}/${product.slug}`}
                >
                  <ProductCard
                    product={product}
                    viewMode={viewMode}
                  />
                </Link>
              ))}
            </div>
            {productsData.length === 0 && (
              <div className='border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500'>
                Nenhuma peça encontrada para os filtros selecionados.
              </div>
            )}
            {/* Paginação */}
            <div className='mt-10 flex items-center justify-center gap-2 border-t border-slate-200 pt-5'>
              <Button
                variant='outline'
                size='icon'
                disabled
                aria-label='Página anterior'
              >
                ‹
              </Button>
              <Button
                size='icon'
                className='bg-red-700'
              >
                1
              </Button>
              <Button
                variant='outline'
                size='icon'
              >
                2
              </Button>
              <Button
                variant='outline'
                size='icon'
              >
                3
              </Button>
              <span className='px-2 text-slate-400'>...</span>
              <Button
                variant='outline'
                size='icon'
              >
                61
              </Button>
              <Button
                variant='outline'
                size='icon'
                aria-label='Próxima página'
              >
                ›
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
