'use client';

import ProductVisual from '@/components/product-visual';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const views = ['Vista frontal', 'Vista lateral', 'Detalhes', 'Diagrama'];

export default function ProductGallery({
  visual,
  productName
}: {
  visual: Parameters<typeof ProductVisual>[0]['type'];
  productName: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () =>
      setCurrentSlide(carouselApi.selectedScrollSnap());

    // handleSelect();
    carouselApi.on('select', handleSelect);
    carouselApi.on('reInit', handleSelect);

    return () => {
      carouselApi.off('select', handleSelect);
      carouselApi.off('reInit', handleSelect);
    };
  }, [carouselApi]);

  return (
    <div className='space-y-3'>
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        className='relative'
      >
        <div className='relative overflow-hidden bg-slate-100 px-5 py-12'>
          <span className='absolute left-4 top-4 z-10 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 shadow-sm sm:left-6 sm:top-6'>
            <span className='mr-1'>●</span> Em estoque
          </span>
          <CarouselContent className='-ml-0'>
            {views.map((view) => (
              <CarouselItem
                key={view}
                className='flex min-h-[300px] items-center justify-center pl-0 sm:min-h-[390px] lg:min-h-[430px]'
                aria-label={`${view} de ${productName}`}
              >
                <ProductVisual
                  type={visual}
                  className='scale-[1.35] sm:scale-[1.75] lg:scale-[2]'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className='left-3 bg-white/90 shadow-sm'
            aria-label='Imagem anterior'
          />
          <CarouselNext
            className='right-3 bg-white/90 shadow-sm'
            aria-label='Próxima imagem'
          />
          <span className='absolute bottom-4 right-4 bg-slate-900 px-2 py-1 font-mono text-[10px] text-white'>
            {currentSlide + 1} / {views.length}
          </span>
        </div>
      </Carousel>

      <div className='grid grid-cols-4 gap-2 sm:gap-3'>
        {views.map((view, index) => (
          <button
            key={view}
            type='button'
            aria-label={`Visualizar ${view.toLowerCase()} de ${productName}`}
            aria-pressed={currentSlide === index}
            className={cn(
              'flex aspect-square items-center justify-center overflow-hidden bg-slate-100 transition-colors',
              currentSlide === index
                ? 'ring-2 ring-red-700 ring-offset-2'
                : 'opacity-65 hover:opacity-100'
            )}
            onClick={() => carouselApi?.scrollTo(index)}
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
