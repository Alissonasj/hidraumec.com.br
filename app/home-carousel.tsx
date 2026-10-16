'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import { LinksPath } from '@/lib/links-path';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import hydraulicImage from './image/category-hydraulics.png';
import wearImage from './image/category-wear.png';
import excavatorImage from './image/hero-excavator-clean.png';

const slides = [
  {
    image: excavatorImage,
    eyebrow: 'Potência e precisão',
    title: 'Peças e serviços hidráulicos de alta performance',
    description:
      'Mantenha sua frota operando no limite com componentes confiáveis e suporte especializado para máquinas pesadas.',
    action: 'Ver catálogo',
    href: LinksPath.CATALOGO
  },
  {
    image: hydraulicImage,
    eyebrow: 'Confiança para sua frota',
    title: 'Mais disponibilidade para o trabalho que não pode parar',
    description:
      'Conte com atendimento técnico próximo para encontrar peças e soluções adequadas para seu equipamento.',
    action: 'Conheça nossos serviços',
    href: LinksPath.SERVICES
  },
  {
    image: wearImage,
    eyebrow: 'Experiência que faz diferença',
    title: 'Uma parceria forte para cada desafio hidráulico',
    description:
      'Há mais de 25 anos apoiando quem move a indústria, a construção e o agronegócio.',
    action: 'Fale com um especialista',
    href: LinksPath.CONTACT
  }
];

export default function HomeCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [motionPreferenceReady, setMotionPreferenceReady] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [autoplayPlugin] = useState(() =>
    Autoplay({
      delay: 6500,
      playOnInit: false,
      stopOnInteraction: false,
      stopOnFocusIn: false
    })
  );
  const isRotating =
    isPlaying && motionPreferenceReady && !prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      setMotionPreferenceReady(true);
    };

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => setActiveSlide(carouselApi.selectedScrollSnap());

    handleSelect();
    carouselApi.on('select', handleSelect);
    carouselApi.on('reInit', handleSelect);

    return () => {
      carouselApi.off('select', handleSelect);
      carouselApi.off('reInit', handleSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    const autoplayPlugin = carouselApi?.plugins().autoplay;
    if (!autoplayPlugin) return;

    if (isRotating) {
      autoplayPlugin.play();
    } else {
      autoplayPlugin.stop();
    }
  }, [carouselApi, isRotating]);

  function selectSlide(index: number) {
    setIsPlaying(false);
    carouselApi?.plugins().autoplay?.stop();
    carouselApi?.scrollTo(index);
    setActiveSlide(index);
  }

  return (
    <section>
      <Carousel
        aria-label='Destaques Hidraumec'
        aria-roledescription='carrossel'
        className='relative isolate min-h-[34rem] overflow-hidden bg-slate-950 text-white sm:min-h-[32rem] lg:min-h-[37rem]'
        onFocusCapture={(event) => {
          const target = event.target;
          if (
            target instanceof HTMLButtonElement &&
            target.dataset.carouselToggle === 'true'
          ) {
            return;
          }
          setIsPlaying(false);
        }}
        opts={{ loop: true }}
        plugins={[autoplayPlugin]}
        setApi={setCarouselApi}
      >
        <CarouselContent className='-ml-0'>
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.title}
              aria-hidden={activeSlide !== index}
              aria-label={`Destaque ${index + 1} de ${slides.length}: ${slide.eyebrow}`}
              className='relative min-h-[34rem] overflow-hidden pl-0 sm:min-h-[32rem] lg:min-h-[37rem]'
              inert={activeSlide !== index}
            >
              <Image
                src={slide.image}
                alt=''
                fill
                sizes='100vw'
                preload={index === 0}
                className='object-cover object-center'
              />
              <div
                aria-hidden='true'
                className='absolute inset-0 bg-[radial-gradient(ellipse_at_78%_58%,rgba(180,83,9,0.25),transparent_42%),linear-gradient(115deg,rgba(2,6,23,0.96)_4%,rgba(15,23,42,0.82)_56%,rgba(15,23,42,0.46)_100%)]'
              />
              <div
                aria-hidden='true'
                className='absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]'
              />
              <div className='relative mx-auto flex min-h-[34rem] max-w-[1440px] flex-col justify-center px-5 pb-24 pt-14 sm:min-h-[32rem] sm:px-8 sm:pb-28 lg:min-h-[37rem] lg:px-10'>
                <div
                  aria-live={
                    activeSlide === index
                      ? isRotating
                        ? 'off'
                        : 'polite'
                      : undefined
                  }
                  className='max-w-2xl'
                >
                  <p className='inline-flex min-h-8 items-center bg-red-700 px-3 text-xs font-bold uppercase tracking-[0.12em] text-white'>
                    {slide.eyebrow}
                  </p>
                  <h1 className='mt-5 max-w-[15ch] text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl'>
                    {slide.title}
                  </h1>
                  <p className='mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg'>
                    {slide.description}
                  </p>
                  <div className='mt-7 flex flex-col gap-3 min-[420px]:flex-row'>
                    <Link
                      href={slide.href}
                      className='inline-flex min-h-12 items-center justify-center gap-3 bg-red-700 px-5 font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
                    >
                      {slide.action}
                      <svg
                        aria-hidden='true'
                        className='size-5'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          d='M5 12h14m-6-6 6 6-6 6'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                        />
                      </svg>
                    </Link>
                    <Link
                      href={LinksPath.CONTACT}
                      className='inline-flex min-h-12 items-center justify-center border border-white/70 px-5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
                    >
                      Solicitar orçamento
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='absolute bottom-5 left-5 right-5 flex items-center justify-between sm:bottom-7 sm:left-8 sm:right-8 lg:left-10 lg:right-10'>
          <p className='text-xs font-medium text-slate-300'>
            {String(activeSlide + 1).padStart(2, '0')} /{' '}
            {String(slides.length).padStart(2, '0')}
          </p>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              data-carousel-toggle='true'
              onClick={() => setIsPlaying((playing) => !playing)}
              disabled={!motionPreferenceReady || prefersReducedMotion}
              aria-label={
                prefersReducedMotion
                  ? 'Rotação automática desativada pela preferência de movimento reduzido'
                  : isRotating
                    ? 'Pausar rotação dos destaques'
                    : 'Retomar rotação dos destaques'
              }
              className='flex size-11 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isRotating ? (
                <svg
                  aria-hidden='true'
                  className='size-4'
                  viewBox='0 0 16 16'
                >
                  <path
                    d='M5 3h2v10H5zm4 0h2v10H9z'
                    fill='currentColor'
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden='true'
                  className='size-4'
                  viewBox='0 0 16 16'
                >
                  <path
                    d='m5 3 8 5-8 5V3Z'
                    fill='currentColor'
                  />
                </svg>
              )}
            </button>
            <div
              role='group'
              aria-label='Selecionar destaque'
              className='flex gap-1'
            >
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type='button'
                  aria-label={`Ir para destaque ${index + 1}: ${item.eyebrow}`}
                  aria-current={index === activeSlide ? 'true' : undefined}
                  onClick={() => selectSlide(index)}
                  className='flex size-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white'
                >
                  <span
                    aria-hidden='true'
                    className={`h-1 w-5 transition-colors ${index === activeSlide ? 'bg-red-500' : 'bg-white/50'}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
}
