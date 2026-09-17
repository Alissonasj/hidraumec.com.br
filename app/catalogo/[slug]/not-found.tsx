export default function NotFound() {
  return (
    <main className='min-h-screen bg-[#f8f9fa] text-slate-900'>
      <div className='mx-auto max-w-360 px-5 py-6 pb-12 lg:px-10 lg:py-8'>
        <h1 className='text-2xl font-bold'>Produto não encontrado</h1>
        <p className='mt-4 text-slate-600'>
          O produto que você está procurando não foi encontrado.
        </p>
      </div>
    </main>
  );
}
