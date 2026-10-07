type SystemType = 'Motor' | 'Eletrico' | 'Transmissao' | 'Freio' | 'Direcao';

export type Product = {
  id: string;
  name: string;
  brand: string;
  reference: string[];
  machine: string[];
  category: string;
  slug: string;
  system: SystemType;
  image?: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type Filter = {
  category: string | string[];
  brand: string | string[];
};

export type PaginationMeta = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  count: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type ServerDtoSuccess<T> = {
  success: true;
  data: T;
  error: null;
  pagination: PaginationMeta | null;
};

type ServerDtoError = {
  success: false;
  data: null;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
  pagination: null;
};

export type ServerDto<T> = ServerDtoSuccess<T> | ServerDtoError;
