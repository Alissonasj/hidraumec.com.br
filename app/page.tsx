import { LinksPath } from '@/lib/links-path';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  GearSixIcon,
  HeadsetIcon,
  PackageIcon,
  TruckIcon,
  WrenchIcon
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import HomeCarousel from './home-carousel';
import engineImage from './image/category-engine.png';
import hydraulicImage from './image/category-hydraulics.png';
import wearImage from './image/category-wear.png';

const categories = [
  {
    title: 'Motores e transmissões',
    description: 'Componentes para manter a força da sua operação.',
    icon: GearSixIcon,
    image: engineImage
  },
  {
    title: 'Sistemas hidráulicos',
    description: 'Bombas, cilindros e soluções hidráulicas.',
    icon: WrenchIcon,
    image: hydraulicImage
  },
  {
    title: 'Material de desgaste',
    description: 'Peças resistentes para as condições mais exigentes.',
    icon: PackageIcon,
    image: wearImage
  }
];

const advantages = [
  {
    title: 'Peças de confiança',
    description:
      'Trabalhamos com componentes selecionados para entregar segurança e durabilidade.',
    icon: CheckCircleIcon
  },
  {
    title: 'Suporte especializado',
    description:
      'Uma equipe técnica preparada para entender sua necessidade e indicar o melhor caminho.',
    icon: HeadsetIcon
  },
  {
    title: 'Agilidade no atendimento',
    description:
      'Atendimento próximo para ajudar sua frota a voltar ao trabalho sem perder tempo.',
    icon: TruckIcon
  },
  {
    title: 'Serviços hidráulicos',
    description:
      'Manutenção e assistência com atenção a cada detalhe do seu equipamento.',
    icon: WrenchIcon
  }
];

export default function Home() {
  return (
    <main
      lang='pt-BR'
      className='flex-1 bg-white pb-20 font-sans text-slate-950'
    >
      <HomeCarousel />

      <section
        id='catalogo'
        aria-labelledby='categories-title'
        className='mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20'
      >
        <div className='mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='mb-2 text-sm font-semibold text-red-700'>
              Soluções para sua operação
            </p>
            <h2
              id='categories-title'
              className='text-3xl font-bold tracking-tight sm:text-4xl'
            >
              Categorias principais
            </h2>
            <p className='mt-3 max-w-xl text-base leading-relaxed text-slate-600'>
              Encontre componentes e serviços para manter seus equipamentos
              trabalhando.
            </p>
          </div>
          <Link
            href={LinksPath.CATALOGO}
            className='inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-red-700 transition-colors hover:text-red-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700'
          >
            Ver todo o catálogo
            <ArrowRightIcon
              aria-hidden='true'
              weight='bold'
            />
          </Link>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {categories.map(({ title, description, icon: Icon, image }) => (
            <Link
              key={title}
              href={LinksPath.CATALOGO}
              className='group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-sm bg-slate-900 p-6 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700 sm:min-h-72 sm:p-7'
            >
              <Image
                src={image}
                alt=''
                fill
                sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                className='object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105'
              />
              <div
                aria-hidden='true'
                className='absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.94),rgba(2,6,23,0.05)_78%)]'
              />
              <div
                aria-hidden='true'
                className='absolute right-5 top-5 flex size-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm'
              >
                <Icon
                  className='size-7'
                  weight='light'
                />
              </div>
              <div className='relative'>
                <h3 className='text-xl font-semibold leading-snug sm:text-2xl'>
                  {title}
                </h3>
                <p className='mt-2 max-w-xs text-sm leading-relaxed text-slate-200'>
                  {description}
                </p>
                <span className='mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-red-300'>
                  Explorar categoria
                  <ArrowUpRightIcon
                    aria-hidden='true'
                    className='transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        id='sobre'
        aria-labelledby='advantages-title'
        className='bg-slate-50'
      >
        <div className='mx-auto grid max-w-[1440px] gap-12 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24'>
          <div>
            <p className='mb-3 text-sm font-semibold text-red-700'>
              Experiência que move resultados
            </p>
            <h2
              id='advantages-title'
              className='max-w-xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'
            >
              Por que escolher a Hidraumec?
            </h2>
            <p className='mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg'>
              Mais do que peças, entregamos confiança para sua operação.
              Combinamos conhecimento técnico e atendimento próximo para
              encontrar soluções que fazem sentido para o seu equipamento.
            </p>

            <ul className='mt-8 grid gap-3 sm:grid-cols-2'>
              {advantages.map(({ title, description, icon: Icon }) => (
                <li
                  key={title}
                  className='flex gap-4 rounded-sm border border-slate-200 bg-white p-5'
                >
                  <span className='flex size-11 shrink-0 items-center justify-center bg-red-50 text-red-700'>
                    <Icon
                      aria-hidden='true'
                      className='size-6'
                      weight='regular'
                    />
                  </span>
                  <div>
                    <h3 className='font-semibold'>{title}</h3>
                    <p className='mt-1 text-sm leading-relaxed text-slate-600'>
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className='relative mx-auto flex min-h-80 w-full max-w-lg items-center justify-center overflow-hidden rounded-sm bg-slate-900 px-6 py-12 text-center text-white sm:min-h-[26rem]'>
            <div
              aria-hidden='true'
              className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,28,28,0.25),transparent_62%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_55%)]'
            />
            <div
              aria-hidden='true'
              className='absolute left-1/2 top-1/2 aspect-square w-[min(82%,18rem)] -translate-x-1/2 -translate-y-1/2 border border-white/15'
            />
            <div
              aria-hidden='true'
              className='absolute left-1/2 top-1/2 aspect-square w-[min(82%,18rem)] -translate-x-1/2 -translate-y-1/2 border border-dashed border-white/20 motion-safe:animate-[spin_48s_linear_infinite] motion-reduce:animate-none'
            />
            <div className='relative'>
              <p className='text-7xl font-bold tracking-tight sm:text-8xl'>
                25<span className='text-red-500'>+</span>
              </p>
              <p className='mt-3 text-sm font-semibold tracking-[0.16em] text-slate-300'>
                ANOS DE EXPERIÊNCIA
              </p>
              <p className='mx-auto mt-6 max-w-xs text-sm leading-relaxed text-slate-300'>
                Conhecimento que acompanha o ritmo de quem trabalha pesado,
                desde 1995.
              </p>
            </div>
            <div className='absolute bottom-5 left-5 flex items-center gap-2 bg-white px-4 py-3 text-left text-slate-900 shadow-lg'>
              <CheckCircleIcon
                aria-hidden='true'
                className='size-5 text-red-700'
                weight='fill'
              />
              <span className='text-xs font-semibold'>
                Compromisso em cada serviço
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
