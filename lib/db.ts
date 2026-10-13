// Criar uma função para gerar o slug com base no nome e referência do produto antes de salvar no banco de dados.

// function getSlug(name: string, reference: string): string {
//   return `${name.toLowerCase().replace(/\s+/g, '-')}-${reference.toLowerCase()}`;
// }

const engineSystemOptions = ['Tanque', 'Filtro', 'Separador'];
const electricSystemOptions = ['Bateria', 'Alternador', 'Motor de Partida'];

export { electricSystemOptions, engineSystemOptions };
