// Criar uma função para gerar o slug com base no nome e referência do produto antes de salvar no banco de dados.

import { Product } from './types';

// function getSlug(name: string, reference: string): string {
//   return `${name.toLowerCase().replace(/\s+/g, '-')}-${reference.toLowerCase()}`;
// }

const engineSystemOptions = ['Tanque', 'Filtro', 'Separador'];
const electricSystemOptions = ['Bateria', 'Alternador', 'Motor de Partida'];
const MOCK_PRODUCTS: Product[] = [
  // ==========================================
  // SISTEMA: MOTOR
  // ==========================================

  // Categorias: Filtro
  {
    id: 'prod-001',
    name: 'Filtro de Lubrificante do Motor Diesel',
    brand: 'Donaldson',
    reference: ['P551807', 'LF16015', 'CAT-1R-1808'],
    machine: ['Escavadeira CAT 320D', 'Pá Carregadeira CAT 924K'],
    category: 'Filtro',
    slug: 'filtro-de-lubrificante-do-motor-diesel-p551807',
    system: 'Motor',
    description:
      'Filtro de óleo blindado de alta eficiência para proteção do sistema de lubrificação de motores a diesel.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },
  {
    id: 'prod-002',
    name: 'Filtro de Ar Primário para Máquinas Amarelas',
    brand: 'Mann-Filter',
    reference: ['C271320', 'P777868'],
    machine: ['Escavadeira Komatsu PC200', 'Trator Komatsu D61'],
    category: 'Filtro',
    slug: 'filtro-de-ar-primario-para-maquinas-amarelas-c271320',
    system: 'Motor',
    description:
      'Elemento filtrante de ar de alta capacidade de retenção de poeira e detritos em operações pesadas.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },

  // Categorias: Tanque
  {
    id: 'prod-003',
    name: 'Tampa com Respiro para Tanque de Combustível',
    brand: 'Caterpillar',
    reference: ['142-8828', '1428828', 'CA1428828'],
    machine: ['Escavadeira CAT 320C', 'Escavadeira CAT 320D'],
    category: 'Tanque',
    slug: 'tampa-com-respiro-para-tanque-de-combustivel-142-8828',
    system: 'Motor',
    description:
      'Tampa de abastecimento em aço com válvula de alívio de pressão e filtro de respiro integrado.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },
  {
    id: 'prod-004',
    name: 'Bóia Medidora de Nível do Tanque de Diesel',
    brand: 'VDO',
    reference: ['224-011-005R', '224011005R'],
    machine: ['Retroescavadeira JCB 3CX', 'Pá Carregadeira Volvo L90H'],
    category: 'Tanque',
    slug: 'boia-medidora-de-nivel-do-tanque-de-diesel-224-011-005r',
    system: 'Motor',
    description:
      'Sensor tubular de combustível blindado contra oscilação de fluido em terrenos irregulares.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },

  // Categorias: Separador
  {
    id: 'prod-005',
    name: 'Filtro Separador de Água Racor com Copo',
    brand: 'Parker Racor',
    reference: ['R90P', 'R90T', 'BF1329-O'],
    machine: ['Retroescavadeira Case 580M', 'Pá Carregadeira Case 621E'],
    category: 'Separador',
    slug: 'filtro-separador-de-agua-racor-com-copo-r90p',
    system: 'Motor',
    description:
      'Elemento separador de água e combustível com copo acrílico transparente para drenagem do condensado.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },

  // ==========================================
  // SISTEMA: ELETRICO
  // ==========================================

  // Categorias: Bateria
  {
    id: 'prod-006',
    name: 'Bateria de Chumbo-Ácido Selada 12V 150Ah',
    brand: 'Moura',
    reference: ['150AH-HEAVY', 'M150AD'],
    machine: ['Pá Carregadeira Michigan 55C', 'Trator de Pneus Valtra BM125'],
    category: 'Bateria',
    slug: 'bateria-de-chumbo-acido-selada-12v-150ah-150ah-heavy',
    system: 'Eletrico',
    description:
      'Bateria para linha pesada com placas reforçadas contra vibrações severas e alta corrente de partida (CCA).',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },
  {
    id: 'prod-007',
    name: 'Chave Geral Desligadora de Bateria 24V',
    brand: 'Bosch',
    reference: ['0341001001', 'BOSCH-CG24V'],
    machine: ['Escavadeira Hyundai R220LC', 'Escavadeira Komatsu PC200'],
    category: 'Bateria',
    slug: 'chave-geral-desligadora-de-bateria-24v-0341001001',
    system: 'Eletrico',
    description:
      'Interruptor de segurança bipolar para corte do circuito principal da bateria em paradas prolongadas.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },

  // Categorias: Alternador
  {
    id: 'prod-008',
    name: 'Alternador de 24V 80A com Regulador',
    brand: 'Bosch',
    reference: ['0124525061', 'F000AL0111'],
    machine: ['Escavadeira Hyundai R220LC', 'Trator de Esteira Komatsu D61'],
    category: 'Alternador',
    slug: 'alternador-de-24v-80a-com-regulador-0124525061',
    system: 'Eletrico',
    description:
      'Alternador blindado para aplicação industrial e máquinas amarelas sob severas condições de poeira e umidade.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },

  // Categorias: Motor de Partida
  {
    id: 'prod-009',
    name: 'Motor de Partida 12V 10D 3.0kW',
    brand: 'Delco Remy',
    reference: ['29MT-10455513', '10455513', '8200008'],
    machine: ['Retroescavadeira Case 580N', 'Minicarregadeira Bobcat S185'],
    category: 'Motor de Partida',
    slug: 'motor-de-partida-12v-10d-30kw-29mt-10455513',
    system: 'Eletrico',
    description:
      'Motor de arranque de alta potência e engate rápido com relé selado para acionamento de motores diesel.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  },
  {
    id: 'prod-010',
    name: 'Relé Solenóide de Partida 24V',
    brand: 'Prestolite',
    reference: ['K01531', '24V-SOL-START'],
    machine: ['Trator John Deere 6110J', 'Pulverizador Jacto Uniport'],
    category: 'Motor de Partida',
    slug: 'rele-solenoide-de-partida-24v-k01531',
    system: 'Eletrico',
    description:
      'Solenóide auxiliar de engate com contatos em liga de prata para prevenção de arcos elétricos.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
  }
];

export { electricSystemOptions, engineSystemOptions, MOCK_PRODUCTS };
