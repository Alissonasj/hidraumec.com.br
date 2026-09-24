export type Product = {
  name: string;
  brand: string;
  reference: string;
  machine: string;
  category: string;
  stock: 'Em estoque' | 'Estoque baixo';
  visual: 'pump' | 'motor' | 'valve';
  slug: string;
};

export type Filter = {
  category: string | string[];
  brand: string | string[];
};
