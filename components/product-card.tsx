'use client';

import ProductVisual from '@/components/product-visual';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Product } from '@/lib/types';
import { Button } from '@base-ui/react';
import { ArrowRightIcon, CheckCircleIcon } from '@phosphor-icons/react';

type ProductCardProps = {
  product: Product;
  viewMode?: 'grid' | 'list';
};

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  return (
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
  );
}
