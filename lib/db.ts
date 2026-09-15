import { Product } from './types';

// Criar uma função para gerar o slug com base no nome e referência do produto antes de salvar no banco de dados.

// function getSlug(name: string, reference: string): string {
//   return `${name.toLowerCase().replace(/\s+/g, '-')}-${reference.toLowerCase()}`;
// }

const products: Product[] = [
  {
    name: 'Bomba Hidráulica Principal Rexroth A8VO107',
    brand: 'Caterpillar',
    reference: '2446352',
    machine: 'Escavadeira CAT 320D / 320D L',
    category: 'Bombas Hidráulicas',
    stock: 'Em estoque',
    visual: 'pump',
    slug: 'bomba-hidraulica-principal-rexroth-2446352'
  },
  {
    name: 'Motor de Giro Completo com Redutor',
    brand: 'Volvo',
    reference: '14524956',
    machine: 'Escavadeira Volvo EC210B',
    category: 'Motores Hidráulicos',
    stock: 'Estoque baixo',
    visual: 'motor',
    slug: 'motor-de-giro-completo-com-redutor-14524956'
  },
  {
    name: 'Válvula de Controle Principal (Bloco Múltiplo)',
    brand: 'Komatsu',
    reference: '7234070100',
    machine: 'Escavadeira Komatsu PC200-8',
    category: 'Válvulas Direcionais',
    stock: 'Em estoque',
    visual: 'valve',
    slug: 'valvula-de-controle-principal-bloco-multiplo-7234070100'
  },
  {
    name: 'Kit de Reparo para Bomba de Pistões',
    brand: 'Rexroth',
    reference: 'R902148799',
    machine: 'Máquinas industriais',
    category: 'Reparos e Vedações',
    stock: 'Em estoque',
    visual: 'pump',
    slug: 'kit-de-reparo-para-bomba-de-pistoes-r902148799'
  },
  {
    name: 'Motor Hidráulico de Tração',
    brand: 'JCB',
    reference: '20925353',
    machine: 'Retroescavadeira 3CX',
    category: 'Motores Hidráulicos',
    stock: 'Estoque baixo',
    visual: 'motor',
    slug: 'motor-hidraulico-de-tracao-20925353'
  },
  {
    name: 'Bloco de Válvulas de Comando',
    brand: 'Caterpillar',
    reference: '3868824',
    machine: 'Escavadeira CAT 336D',
    category: 'Válvulas Direcionais',
    stock: 'Em estoque',
    visual: 'valve',
    slug: 'bloco-de-valvulas-de-comando-3868824'
  }
];
const categories = [
  'Bombas Hidráulicas',
  'Motores Hidráulicos',
  'Cilindros',
  'Válvulas Direcionais',
  'Reparos e Vedações'
];
const brands = ['Caterpillar', 'Volvo', 'Komatsu', 'JCB', 'Rexroth'];

export { brands, categories, products };
