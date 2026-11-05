'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useUrlParams } from '@/hooks/useUrlParams';
import { MouseEvent, RefObject } from 'react';
import { PaginationMeta, VisiblePage } from '../lib/types';

export default function PaginationRender({
  pagination,
  ref
}: {
  pagination: PaginationMeta;
  ref?: RefObject<HTMLElement>;
}) {
  const { setUrlSearchParams, searchParams, pathname } = useUrlParams();

  function handlePageChange(
    event: MouseEvent<HTMLAnchorElement>,
    page: number,
    ref?: RefObject<HTMLElement>
  ) {
    event.preventDefault();

    if (
      page >= 1 &&
      page <= pagination.totalPages &&
      page !== pagination.currentPage
    ) {
      setUrlSearchParams('page', String(page));
      if (ref) {
        ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  function getVisiblePages(
    currentPage: number,
    totalPages: number
  ): VisiblePage[] {
    const pages: VisiblePage[] = [];

    for (let page = 1; page <= totalPages; page += 1) {
      if (
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 1
      ) {
        pages.push(page);
      } else if (pages[pages.length - 1] !== 'ellipsis') {
        pages.push('ellipsis');
      }
    }

    return pages;
  }

  function getPageHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className='mt-10 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between'>
      <p className='text-sm text-slate-500'>
        Exibindo{' '}
        <span className='font-semibold text-slate-700'>
          {pagination.totalCount === 0
            ? 0
            : (pagination.currentPage - 1) * pagination.totalItemsPerPage + 1}
          {'–'}
          {Math.min(
            pagination.currentPage * pagination.totalItemsPerPage,
            pagination.totalCount
          )}
        </span>{' '}
        de{' '}
        <span className='font-semibold text-slate-700'>
          {pagination.totalCount}
        </span>{' '}
        peças
      </p>

      <Pagination
        aria-label='Paginação do catálogo'
        className='mx-0 w-auto justify-start sm:justify-end'
      >
        <PaginationContent className='gap-1'>
          <PaginationItem>
            <PaginationPrevious
              href={getPageHref(pagination.currentPage - 1)}
              text='Anterior'
              aria-disabled={!pagination.hasPreviousPage}
              tabIndex={pagination.hasPreviousPage ? 0 : -1}
              className={
                pagination.hasPreviousPage
                  ? 'rounded-md text-slate-600 hover:bg-red-50 hover:text-red-700'
                  : 'pointer-events-none rounded-md opacity-40'
              }
              onClick={(event) =>
                handlePageChange(event, pagination.currentPage - 1, ref)
              }
            />
          </PaginationItem>

          {getVisiblePages(pagination.currentPage, pagination.totalPages).map(
            (page, index) => (
              <PaginationItem key={`${page}-${index}`}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis className='text-slate-400' />
                ) : (
                  <PaginationLink
                    href={getPageHref(page)}
                    isActive={page === pagination.currentPage}
                    aria-label={`Ir para a página ${page}`}
                    size='icon'
                    className={
                      page === pagination.currentPage
                        ? 'rounded-md border-red-700 bg-red-700 font-semibold text-white shadow-sm hover:bg-red-800 hover:text-white'
                        : 'rounded-md text-slate-600 hover:bg-red-50 hover:text-red-700'
                    }
                    onClick={(event) => handlePageChange(event, page, ref)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href={getPageHref(pagination.currentPage + 1)}
              text='Próxima'
              aria-disabled={!pagination.hasNextPage}
              tabIndex={pagination.hasNextPage ? 0 : -1}
              className={
                pagination.hasNextPage
                  ? 'rounded-md text-slate-600 hover:bg-red-50 hover:text-red-700'
                  : 'pointer-events-none rounded-md opacity-40'
              }
              onClick={(event) =>
                handlePageChange(event, pagination.currentPage + 1, ref)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
