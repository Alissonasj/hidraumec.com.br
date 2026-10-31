import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LinksPath } from '@/lib/links-path';
import { Product } from '@/lib/types';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  DownloadSimpleIcon,
  FileTextIcon,
  HeadsetIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartSimpleIcon
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import ProductGallery from './product-gallery';

const specifications = [
  ['Deslocamento', '35 cm³/rev'],
  ['Pressão máxima', '250 bar'],
  ['Velocidade máxima', '2500 rpm'],
  ['Peso', '18 kg'],
  ['Flange de montagem', 'SAE B, 2 furos']
];

export default function ProductDetails({ product }: { product: Product }) {
  const safeImages = product.images ?? [];

  return (
    <main className='min-h-screen bg-[#f8f9fa] text-slate-900'>
      <div className='mx-auto max-w-360 px-5 py-6 pb-12 lg:px-10 lg:py-8'>
        <Link
          href={LinksPath.CATALOGO}
          className='mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-500 hover:text-red-700'
        >
          <ArrowLeftIcon /> Voltar ao catálogo
        </Link>

        <div className='grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:gap-14'>
          <ProductGallery
            productName={product.name}
            productImages={safeImages}
          />
          <section className='flex flex-col'>
            <p className='mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-red-700'>
              {product.category}
            </p>
            <h1 className='font-heading text-2xl font-bold leading-tight sm:text-3xl'>
              {product.name}
            </h1>
            <p className='mt-2 text-sm text-slate-600'>{product.machines}</p>
            <div className='mt-5 flex flex-wrap gap-2'>
              <Badge className='bg-slate-200 px-3 py-1 font-mono text-slate-700 hover:bg-slate-200'>
                PN: {product.references[0]}
              </Badge>
              <Badge className='bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-100'>
                <CheckCircleIcon /> Compatível
              </Badge>
            </div>
            <p className='mt-7 text-sm leading-7 text-slate-600'>
              {product.description}
            </p>

            <QuoteBox />
          </section>
        </div>

        <div className='mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] lg:gap-12'>
          <section>
            <SectionHeading
              number='01'
              title='Especificações técnicas'
            />
            <div className='mt-4 overflow-hidden border border-slate-200 bg-white'>
              {specifications.map(([label, value], index) => (
                <div
                  key={label}
                  className={`grid grid-cols-2 gap-4 px-5 py-4 text-sm ${index % 2 ? 'bg-slate-100' : ''}`}
                >
                  <span className='font-mono font-bold text-slate-600'>
                    {label}
                  </span>
                  <span className='font-mono font-bold text-slate-900'>
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <SectionHeading
              number='02'
              title='Compatibilidade'
              className='mt-10'
            />
            <div className='mt-4 flex flex-wrap gap-3'>
              {product.machines?.map((item) => (
                <span
                  key={item}
                  className='bg-slate-200 px-4 py-2 font-mono text-xs font-bold text-slate-700'
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <aside className='space-y-6'>
            <Card className='border-0 bg-slate-200 shadow-none'>
              <CardHeader className='flex-row items-center gap-3 p-6 pb-2'>
                <FileTextIcon className='size-6' />
                <h2 className='font-heading text-base font-bold'>
                  Documentação
                </h2>
              </CardHeader>
              <CardContent className='p-6 pt-3'>
                <p className='mb-5 text-sm leading-6 text-slate-600'>
                  Acesse o manual de instalação e o diagrama de peças detalhado.
                </p>
                <Button
                  variant='outline'
                  className='w-full bg-white'
                >
                  <DownloadSimpleIcon /> Baixar ficha técnica
                </Button>
              </CardContent>
            </Card>
            <Card className='border-0 bg-red-700 text-white shadow-none'>
              <CardHeader className='flex-row items-center gap-3 p-6 pb-2'>
                <HeadsetIcon className='size-6' />
                <h2 className='font-heading text-base font-bold'>
                  Dúvidas técnicas?
                </h2>
              </CardHeader>
              <CardContent className='p-6 pt-3'>
                <p className='mb-5 text-sm leading-6 text-red-100'>
                  Nossa equipe de engenharia está disponível para confirmar a
                  compatibilidade com seu equipamento.
                </p>
                <Button className='w-full bg-white text-red-700 hover:bg-red-50'>
                  Falar com especialista
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function QuoteBox() {
  return (
    <Card className='mt-8 border-0 bg-slate-100 shadow-none'>
      <CardContent className='p-6'>
        <p className='mb-5 font-heading text-base font-bold'>
          Solicitar orçamento
        </p>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
          <div>
            <p className='mb-2 font-mono text-xs font-bold text-slate-600'>
              Quantidade
            </p>
            <div className='flex h-12 items-center border border-slate-200 bg-white'>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Diminuir quantidade'
              >
                <MinusIcon />
              </Button>
              <span className='w-10 text-center font-mono'>1</span>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Aumentar quantidade'
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
          <Button className='h-12 flex-1 bg-red-700 text-sm font-bold hover:bg-red-800'>
            <ShoppingCartSimpleIcon /> Adicionar ao orçamento
          </Button>
        </div>
        <p className='mt-5 font-mono text-xs text-slate-500'>
          Orçamento respondido em até 2 horas comerciais.
        </p>
      </CardContent>
    </Card>
  );
}

function SectionHeading({
  number,
  title,
  className = ''
}: {
  number: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className='flex size-8 items-center justify-center bg-slate-200 font-mono text-xs font-bold'>
        {number}
      </span>
      <h2 className='text-sm font-bold'>{title}</h2>
    </div>
  );
}
