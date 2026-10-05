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
