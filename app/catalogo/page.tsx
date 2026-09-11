'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
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
import { brands, categories } from '@/lib/db';
import { Product } from '@/lib/types';
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  FunnelIcon,
  HouseIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  PipeWrenchIcon,
  ShareNetworkIcon,
  SquaresFourIcon,
  XIcon
} from '@phosphor-icons/react';
import Link from 'next/link';
import { ChangeEvent, SubmitEvent, useState } from 'react';
import { FilterSection } from './components/filter-section';

function ProductVisual({
  type,
  className = ''
}: {
  type: Product['visual'];
  className?: string;
}) {
  return (
    <div
      className={`product-visual product-visual-${type} ${className}`}
      aria-hidden='true'
    >
      <div className='machine-shadow' />
      <div className='machine-body' />
      <div className='machine-detail' />
      <div className='machine-hub' />
    </div>
  );
}

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
      <div className='flex items-center justify-between border-b border-slate-200 pb-4'>
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

export default function CatalogoPage() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewProductsData, setPreviewProductsData] = useState<Product[]>([]);
  const { productsData } = useProducts();

  function handleOnChangeInputSearch(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) {
    setQuery(event.target.value);
    const timeout = window.setTimeout(
      () => searchProducts(event.target.value),
      400
    );
    return () => window.clearTimeout(timeout);

    async function searchProducts(query: string) {
      const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      setPreviewProductsData(data.result);
    }
  }

  const toggle = (
    value: string,
    setter: (values: string[]) => void,
    current: string[]
  ) =>
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  function submitSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  }

  return (
    <div className='min-h-screen bg-[#f8f9fa] text-slate-900'>
      <header className='border-b border-slate-200 bg-white desktop-top-nav'>
        <div className='mx-auto flex items-center gap-4 px-5 py-4 lg:px-10'>
          <Link
            href='/'
            className='flex shrink-0 items-center gap-3'
            aria-label='Hidraumec início'
          >
            <div className='flex size-10 items-center justify-center border-l-4 border-red-700 bg-slate-50 text-[9px] font-black leading-none text-red-700'>
              H<br />M
            </div>
            <span className='hidden text-xl font-black tracking-[-0.06em] text-slate-900 sm:block'>
              HIDRAUMEC
            </span>
          </Link>
          <form
            className='relative ml-auto w-full max-w-92.5'
            onSubmit={submitSearch}
          >
            <div className='flex bg-slate-100'>
              <MagnifyingGlassIcon className='ml-4 mt-3.5 size-4 shrink-0 text-slate-500' />
              <Input
                value={query}
                onChange={handleOnChangeInputSearch}
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
                {previewProductsData.length > 0 ? (
                  <ul className='divide-y divide-slate-100'>
                    {previewProductsData.map((product) => (
                      <li key={product.reference}>
                        <button
                          type='button'
                          className='flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50'
                          onClick={() => {
                            setQuery(product.reference);
                            setSubmittedQuery(product.reference);
                          }}
                        >
                          <span className='flex size-12 shrink-0 items-center justify-center overflow-hidden bg-slate-50'>
                            <ProductVisual
                              type={product.visual}
                              className='!w-[210px] shrink-0 scale-[0.3]'
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
                )}
              </div>
            )}
          </form>
          <nav className='ml-auto hidden items-center gap-7 text-xs font-bold uppercase text-slate-600 lg:flex'>
            <Link
              href='#inicio'
              className='hover:text-red-700'
            >
              Início
            </Link>
            <Link
              href='#catalogo'
              className='text-red-700'
            >
              Catálogo
            </Link>
            <Link
              href='#servicos'
              className='hover:text-red-700'
            >
              Serviços
            </Link>
            <Link
              href='#sobre'
              className='hover:text-red-700'
            >
              Sobre
            </Link>
            <Link
              href='#contato'
              className='hover:text-red-700'
            >
              Contato
            </Link>
          </nav>
          <nav className='mobile-bottom-nav ml-auto items-center justify-center gap-7 text-xs font-bold uppercase text-white lg:hidden flex h-16 bg-slate-900 px-5 shadow-lg'>
            <Link
              href='#inicio'
              className='hover:text-red-700'
            >
              <div className='flex flex-col items-center gap-1'>
                <HouseIcon className='size-5' />
              </div>
            </Link>
            <Link
              href='#catalogo'
              className='text-red-700'
            >
              <div className='flex flex-col items-center gap-1'>
                <BookOpenTextIcon className='size-5' />
              </div>
            </Link>
            <Link
              href='#servicos'
              className='hover:text-red-700'
            >
              <div className='flex flex-col items-center gap-1'>
                <PipeWrenchIcon className='size-5' />
              </div>
            </Link>
            <Link
              href='#sobre'
              className='hover:text-red-700'
            >
              <div className='flex flex-col items-center gap-1'>
                <BuildingOfficeIcon className='size-5' />
              </div>
            </Link>
            <Link
              href='#contato'
              className='hover:text-red-700'
            >
              <div className='flex flex-col items-center gap-1'>
                <PhoneIcon className='size-5' />
              </div>
            </Link>
          </nav>
        </div>
      </header>

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
                toggleCategory={(value) =>
                  toggle(value, setSelectedCategories, selectedCategories)
                }
                toggleBrand={(value) =>
                  toggle(value, setSelectedBrands, selectedBrands)
                }
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
              toggleCategory={(value) =>
                toggle(value, setSelectedCategories, selectedCategories)
              }
              toggleBrand={(value) =>
                toggle(value, setSelectedBrands, selectedBrands)
              }
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
                <Card
                  key={product.reference}
                  className={`bg-white transition-shadow hover:shadow-lg ${viewMode === 'list' ? 'sm:flex sm:flex-row' : ''}`}
                >
                  <CardHeader
                    className={`relative flex min-h-[245px] items-center justify-center bg-slate-50 p-5 ${viewMode === 'list' ? 'sm:min-h-0 sm:w-56 sm:shrink-0' : ''}`}
                  >
                    <span
                      className={`absolute right-4 top-4 text-[10px] font-bold uppercase tracking-[0.08em] ${product.stock === 'Em estoque' ? 'text-emerald-700' : 'text-amber-700'}`}
                    >
                      <span className='mr-1'>●</span>
                      {product.stock}
                    </span>
                    <ProductVisual type={product.visual} />
                  </CardHeader>
                  <CardContent className='flex flex-1 flex-col gap-3 p-5'>
                    <span className='w-fit bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600'>
                      {product.brand}
                    </span>
                    <h2 className='font-heading text-base font-bold leading-snug text-slate-900'>
                      {product.name}
                    </h2>
                    <p className='font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500'>
                      Ref: {product.reference}
                    </p>
                    <div className='mt-auto flex items-start gap-2 bg-slate-800 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-white'>
                      <CheckCircleIcon className='mt-0.5 size-4 shrink-0 text-emerald-400' />{' '}
                      Compatível: {product.machine}
                    </div>
                  </CardContent>
                  <CardFooter
                    className={`border-0 p-5 pt-0 ${viewMode === 'list' ? 'sm:w-56 sm:shrink-0 sm:items-center sm:pt-5' : ''}`}
                  >
                    <Button className='h-11 w-full bg-red-700 text-sm font-bold uppercase hover:bg-red-800'>
                      Solicitar orçamento <ArrowRightIcon />
                    </Button>
                  </CardFooter>
                </Card>
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

      <footer
        id='contato'
        className='mt-8 bg-[#101c22] text-slate-300'
      >
        <div className='mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-10'>
          <div>
            <div className='mb-4 flex size-12 items-center justify-center border-l-4 border-red-500 bg-white text-[10px] font-black leading-none text-red-700'>
              H<br />M
            </div>
            <p className='max-w-[220px] text-sm leading-relaxed'>
              Soluções hidráulicas industriais com máxima precisão e
              durabilidade desde 1995.
            </p>
          </div>
          <div>
            <h2 className='mb-4 text-lg font-bold text-white'>Links Rápidos</h2>
            <div className='space-y-3 text-sm'>
              <Link
                className='block hover:text-white'
                href='#catalogo'
              >
                Peças Originais
              </Link>
              <Link
                className='block hover:text-white'
                href='#servicos'
              >
                Manutenção Preventiva
              </Link>
              <Link
                className='block hover:text-white'
                href='#sobre'
              >
                Certificações
              </Link>
            </div>
          </div>
          <div>
            <h2 className='mb-4 text-lg font-bold text-white'>Contato</h2>
            <p className='mb-3 flex gap-2 text-sm'>
              <MapPinIcon className='size-5 shrink-0' /> Av. Industrial, 1500 -
              SP
            </p>
            <p className='flex gap-2 text-sm'>
              <PhoneIcon className='size-5 shrink-0' /> +55 11 4004-0000
            </p>
          </div>
          <div>
            <h2 className='mb-4 text-lg font-bold text-white'>Siga-nos</h2>
            <Button
              size='icon'
              variant='secondary'
              aria-label='Compartilhar'
            >
              <ShareNetworkIcon />
            </Button>
          </div>
        </div>
        <div className='border-t border-white/10 px-5 py-4 text-xs text-slate-500 lg:px-10'>
          <div className='mx-auto flex max-w-[1440px] justify-between'>
            <span>© 2024 Hidraumec. Todos os direitos reservados.</span>
            <span className='hidden gap-5 sm:flex'>
              <Link href='#privacidade'>Privacidade</Link>
              <Link href='#termos'>Termos</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
