import { Product } from './types';

const products: Product[] = [
  {
    name: 'Bomba Hidráulica Principal Rexroth A8VO107',
    brand: 'Caterpillar',
    reference: '244-6352',
    machine: 'Escavadeira CAT 320D / 320D L',
    category: 'Bombas Hidráulicas',
    stock: 'Em estoque',
    visual: 'pump'
  },
  {
    name: 'Motor de Giro Completo com Redutor',
    brand: 'Volvo',
    reference: '14524956',
    machine: 'Escavadeira Volvo EC210B',
    category: 'Motores Hidráulicos',
    stock: 'Estoque baixo',
    visual: 'motor'
  },
  {
    name: 'Válvula de Controle Principal (Bloco Múltiplo)',
    brand: 'Komatsu',
    reference: '723-40-70100',
    machine: 'Escavadeira Komatsu PC200-8',
    category: 'Válvulas Direcionais',
    stock: 'Em estoque',
    visual: 'valve'
  },
  {
    name: 'Kit de Reparo para Bomba de Pistões',
    brand: 'Rexroth',
    reference: 'R902148799',
    machine: 'Máquinas industriais',
    category: 'Reparos e Vedações',
    stock: 'Em estoque',
    visual: 'pump'
  },
  {
    name: 'Motor Hidráulico de Tração',
    brand: 'JCB',
    reference: '20/925353',
    machine: 'Retroescavadeira 3CX',
    category: 'Motores Hidráulicos',
    stock: 'Estoque baixo',
    visual: 'motor'
  },
  {
    name: 'Bloco de Válvulas de Comando',
    brand: 'Caterpillar',
    reference: '386-8824',
    machine: 'Escavadeira CAT 336D',
    category: 'Válvulas Direcionais',
    stock: 'Em estoque',
    visual: 'valve'
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
