// Criar uma função para gerar o slug com base no nome e referência do produto antes de salvar no banco de dados.

// function getSlug(name: string, reference: string): string {
//   return `${name.toLowerCase().replace(/\s+/g, '-')}-${reference.toLowerCase()}`;
// }

type SystemType = 'Motor' | 'Eletrico' | 'Transmissao' | 'Freio' | 'Direcao';
type Product = {
  id: string;
  name: string;
  brand: string;
  reference: string[];
  machine: string[];
  category: string;
  slug: string;
  system: SystemType;
  image?: string[];
  description?: string;
  updatedAt?: string;
  createdAt?: string;
};
type FilterOptions = {
  category: string | string[];
  brand: string | string[];
};
type PaginationMeta = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
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
type VisiblePage = number | 'ellipsis';
type ServerDto<T> = ServerDtoSuccess<T> | ServerDtoError;

const engineSystemOptions = ['Tanque', 'Filtro', 'Separador'];
const electricSystemOptions = ['Bateria', 'Alternador', 'Motor de Partida'];
const defaultPagination: PaginationMeta = {
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  isFirstPage: true,
  isLastPage: true
};

export { defaultPagination, electricSystemOptions, engineSystemOptions };

export type {
  FilterOptions,
  PaginationMeta,
  Product,
  ServerDto,
  ServerDtoError,
  ServerDtoSuccess,
  SystemType,
  VisiblePage
};
