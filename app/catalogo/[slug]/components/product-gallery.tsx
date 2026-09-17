'use client';

import ProductVisual from '@/components/product-visual';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { useState } from 'react';

const views = ['Vista frontal', 'Vista lateral', 'Detalhes', 'Diagrama'];

export default function ProductGallery({
  visual,
  productName
}: {
  visual: Parameters<typeof ProductVisual>[0]['type'];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const changeSlide = (direction: number) => {
    setActiveIndex((activeIndex + direction + views.length) % views.length);
  };

  return (
    <div className='space-y-3'>
      <div className='relative flex min-h-[300px] items-center justify-center overflow-hidden bg-slate-100 px-5 py-12 sm:min-h-[390px] lg:min-h-[430px]'>
        <span className='absolute left-4 top-4 z-10 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 shadow-sm sm:left-6 sm:top-6'>
          <span className='mr-1'>●</span> Em estoque
        </span>
        <div
          className='flex w-full items-center justify-center transition-opacity duration-300'
          aria-live='polite'
        >
          <ProductVisual
            type={visual}
            className='scale-[1.35] sm:scale-[1.75] lg:scale-[2]'
          />
        </div>
        <Button
          type='button'
          variant='secondary'
          size='icon'
          className='absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 shadow-sm'
          aria-label='Imagem anterior'
          onClick={() => changeSlide(-1)}
        >
          <CaretLeftIcon />
        </Button>
        <Button
          type='button'
          variant='secondary'
          size='icon'
          className='absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 shadow-sm'
          aria-label='Próxima imagem'
          onClick={() => changeSlide(1)}
        >
          <CaretRightIcon />
        </Button>
        <span className='absolute bottom-4 right-4 bg-slate-900 px-2 py-1 font-mono text-[10px] text-white'>
          {activeIndex + 1} / {views.length}
        </span>
      </div>

      <div className='grid grid-cols-4 gap-2 sm:gap-3'>
        {views.map((view, index) => (
          <button
            key={view}
            type='button'
            aria-label={`Visualizar ${view.toLowerCase()} de ${productName}`}
            aria-pressed={activeIndex === index}
            className={cn(
              'flex aspect-square items-center justify-center overflow-hidden bg-slate-100 transition-colors',
              activeIndex === index
                ? 'ring-2 ring-red-700 ring-offset-2'
                : 'opacity-65 hover:opacity-100'
            )}
            onClick={() => setActiveIndex(index)}
          >
            <ProductVisual
              type={visual}
              className={cn(
                'scale-75 sm:scale-90',
                index === 1 && 'rotate-3',
                index === 2 && '-rotate-3',
                index === 3 && 'scale-60'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
