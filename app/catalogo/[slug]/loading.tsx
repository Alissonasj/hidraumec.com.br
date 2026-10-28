import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className='min-h-screen bg-[#f8f9fa] flex items-center justify-center gap-4'>
      <Spinner
        className='size-5 text-red-700'
        aria-label='Carregando produto'
      />
      Carregando produto...
    </div>
  );
}
