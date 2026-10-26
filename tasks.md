# Frontend

> Mantido pelo agente `tech-lead-frontend`. Última atualização: 2026-10-26
> Prioridade: P0 fundamental · P1 escopo · P2 desejável. Esforço: P · M · G.

## 1. Visão geral
- **Escopo entendido:** Site institucional B2B com catálogo público de peças e serviços para máquinas pesadas. O objetivo é apresentar a empresa e converter visitantes em contatos ou pedidos de orçamento; não há checkout no escopo confirmado.
- **Estado atual:** A home, pesquisa e catálogo já existem, com produtos consultados no Supabase, filtros, paginação e página dinâmica de produto. As páginas `/contato`, `/sobre` e `/servicos` ainda são placeholders. Há ações de orçamento sem comportamento funcional e conteúdo de produto/contato que parece demonstrativo.
- **Premissas a confirmar:** Validar com a empresa os canais de contato, dados institucionais, endereço, horários, certificações, imagens, estoque e especificações antes de publicar. O envio de formulário depende da definição de quem recebe as solicitações.
- **Próximo passo recomendado:** T-001

## 2. Backlog (ordem sugerida)
- [ ] **T-001 · Criar página de contato e conversão** — P0 · M · UI
  - **Por quê:** A rota atual é apenas um placeholder e o site precisa converter consultas do catálogo em contatos reais.
  - **O que fazer:** Apresentar os canais de contato confirmados e, se definido, um formulário acessível que encaminhe solicitações ao destino aprovado. Substituir telefones, endereços e promessas de atendimento demonstrativos por dados confirmados.
  - **Critérios de aceite:**
    - Links de telefone, e-mail ou WhatsApp funcionam e exibem apenas canais aprovados; o formulário informa validação, envio concluído e falha sem simular sucesso.
    - Mobile-first: conteúdo e campos funcionam em ~360 px, sem rolagem horizontal, e se reorganizam em tablet e desktop.
    - Estados: envio/carregamento visível; vazio quando não houver canal ou conteúdo publicado; erro de validação ou envio comunicado; rota pública sem exigir permissão e sem expor dados internos.
  - **Depende de:** B-002; canal de contato aprovado pela empresa
  - **Referências:** `app/contato/page.tsx`, `app/layout.tsx`

- [ ] **T-002 · Publicar conteúdo institucional sobre a empresa** — P1 · M · UI
  - **Por quê:** A rota `/sobre` não apresenta a empresa, sua história ou evidências de confiança.
  - **O que fazer:** Criar uma página institucional com história, atuação, diferenciais e certificações somente quando confirmados; revisar também afirmações repetidas na home e no rodapé.
  - **Critérios de aceite:**
    - Todo dado factual (incluindo “desde 1995” e “25+ anos”) é validado pela empresa; imagens têm texto alternativo adequado.
    - Mobile-first: hierarquia e leitura confortáveis em ~360 px, adaptadas a tablet e desktop.
    - Estados: conteúdo estático não simula carregamento; dados ou imagens ausentes têm fallback; falha de conteúdo remoto é comunicada; página permanece pública sem exigir permissão.
  - **Depende de:** Aprovação dos dados e materiais institucionais
  - **Referências:** `app/sobre/page.tsx`, `app/page.tsx`, `app/layout.tsx`

- [ ] **T-003 · Apresentar os serviços oferecidos** — P1 · M · UI
  - **Por quê:** A rota `/servicos` está em desenvolvimento e a home promete suporte e serviços sem detalhar a oferta.
  - **O que fazer:** Descrever os serviços realmente prestados, seu escopo e como solicitar atendimento; conectar cada chamada à página de contato ou ao canal aprovado.
  - **Critérios de aceite:**
    - Serviços e promessas publicados são confirmados pela empresa; cada chamada leva a um canal funcional.
    - Mobile-first: conteúdo e chamadas funcionam em ~360 px e se adaptam a tablet e desktop.
    - Estados: conteúdo estático não simula carregamento; ausência de serviços publicados tem estado vazio orientativo; erro de conteúdo remoto é comunicado; página pública sem exigir permissão.
  - **Depende de:** Aprovação da lista e descrição dos serviços
  - **Referências:** `app/servicos/page.tsx`, `app/page.tsx`

- [ ] **T-004 · Aplicar identidade visual aprovada no site** — P1 · M · UI
  - **Por quê:** O cabeçalho e rodapé usam um monograma textual como marca; há um `favicon.ico`, mas não há evidência de que seja o favicon oficial.
  - **O que fazer:** Substituir o monograma por arquivos oficiais de marca, validar/substituir o favicon existente e revisar nome, links e informações globais do cabeçalho e rodapé. Manter a navegação móvel compreensível para leitores de tela.
  - **Critérios de aceite:**
    - Marca e favicon aprovados são exibidos corretamente; links globais funcionam e itens de navegação por ícone têm nome acessível.
    - Mobile-first: cabeçalho, busca e navegação inferior cabem em ~360 px e se adaptam a tablet e desktop sem cobrir conteúdo.
    - Estados: identidade é estática; assets ausentes não quebram o layout; falha de carregamento não remove os links; navegação pública não exige permissão.
  - **Depende de:** Arquivos oficiais de marca e informações de rodapé aprovadas
  - **Referências:** `app/layout.tsx`, `app/favicon.ico`

- [ ] **T-005 · Completar filtros e pesquisa do catálogo** — P1 · M · UI
  - **Por quê:** O filtro de modelo de máquina não está conectado, a interface só mantém categorias e o serviço ignora filtro por marca; sugestões de pesquisa consultam dados a cada digitação.
  - **O que fazer:** Alinhar filtros disponíveis, valores, URL e consulta aos campos reais do catálogo; tornar pesquisa previsível, preservando filtros e paginação ao navegar e oferecendo feedback para sugestões.
  - **Critérios de aceite:**
    - Filtros de categoria, marca e máquina só são oferecidos se suportados por dados reais; aplicar, remover e limpar filtros atualiza resultados e URL de forma reproduzível.
    - Mobile-first: filtros e pesquisa são utilizáveis em ~360 px, inclusive no painel móvel, e se adaptam a tablet e desktop.
    - Estados: carregamento perceptível; nenhum resultado explica como ajustar filtros; erros de consulta não aparecem como catálogo vazio; restrição de acesso é comunicada sem expor dados.
  - **Depende de:** B-001
  - **Referências:** `app/catalogo/page.tsx`, `app/catalogo/components/catalog.tsx`, `app/catalogo/components/search-input.tsx`, `services/product-service.ts`

- [ ] **T-006 · Tornar os detalhes e ações dos produtos confiáveis** — P1 · M · UI
  - **Por quê:** A página apresenta especificações estáticas iguais para produtos diferentes, indica estoque sem confirmação e contém botões de orçamento, download e contato sem ação.
  - **O que fazer:** Exibir somente especificações, disponibilidade e documentos existentes para cada produto; direcionar a solicitação de orçamento para o canal aprovado e remover controles sem destino funcional.
  - **Critérios de aceite:**
    - Informações técnicas e de estoque vêm de fonte validada; dado ausente não é substituído por valor demonstrativo; todas as ações funcionam ou não são exibidas.
    - Mobile-first: galeria, compatibilidade e ação principal funcionam em ~360 px e se adaptam a tablet e desktop.
    - Estados: carregamento de produto/imagens; produto sem dados complementares; falha de consulta ou imagem; produto indisponível ou sem permissão com orientação adequada.
  - **Depende de:** B-001 e canal aprovado para solicitações
  - **Referências:** `app/catalogo/[slug]/components/product-details.tsx`, `app/catalogo/[slug]/components/product-gallery.tsx`, `components/product-card.tsx`

- [ ] **T-007 · Tratar carregamento e falhas de dados nas rotas** — P1 · M · UI
  - **Por quê:** Rotas assíncronas não têm interfaces próprias de carregamento/erro; falhas do serviço podem ser convertidas em listas vazias, confundindo indisponibilidade com ausência de produtos.
  - **O que fazer:** Diferenciar erro, lista vazia e resultado válido em catálogo, pesquisa e produto; adicionar interfaces de carregamento e recuperação coerentes com os componentes existentes.
  - **Critérios de aceite:**
    - Falha do Supabase é apresentada como falha recuperável e nunca como sucesso ou resultado vazio; item inexistente continua usando o 404 apropriado.
    - Mobile-first: skeletons, mensagens e controles de tentar novamente funcionam em ~360 px e se adaptam a tablet e desktop.
    - Estados: carregamento, vazio, erro e sem permissão são distintos e testáveis; rotas públicas continuam acessíveis sem autenticação.
  - **Depende de:** Nada
  - **Referências:** `app/catalogo/page.tsx`, `app/pesquisa/[search]/page.tsx`, `app/catalogo/[slug]/page.tsx`, `services/product-service.ts`, `app/not-found.tsx`

- [ ] **T-008 · Revisar metadados e compartilhamento por rota** — P1 · P · UI
  - **Por quê:** A configuração técnica de SEO já existe, mas a imagem Open Graph global é externa e genérica, e as páginas institucionais não definem metadados próprios.
  - **O que fazer:** Definir título, descrição, canonical e imagem social coerentes para cada página; usar a identidade oficial e evitar descrições de produto que afirmem preço ou disponibilidade não confirmados.
  - **Critérios de aceite:**
    - Cada rota principal e produto tem metadados próprios, sem canonical ou imagem social indevidos; sitemap e robots refletem as rotas públicas reais.
    - Mobile-first: prévias de compartilhamento usam imagens legíveis em dimensões móveis e desktop.
    - Estados: metadados de páginas estáticas não dependem de carregamento; produto sem metadados usa fallback neutro; falha na leitura não gera descrição enganosa; conteúdo permanece público.
  - **Depende de:** T-001, T-002, T-003, T-004 e B-001
  - **Referências:** `app/layout.tsx`, `app/catalogo/page.tsx`, `app/catalogo/[slug]/page.tsx`, `robots.ts`, `sitemap.ts`

## 3. Melhorias sugeridas
- [ ] **M-001 · Auditar acessibilidade WCAG 2.2 AA** — P1 · M · UX
  - **Situação atual (evidência):** A navegação móvel em `app/layout.tsx` usa links representados apenas por ícones; não há arquivos de testes automatizados no projeto.
  - **Proposta:** Auditar teclado, foco, nomes acessíveis, contraste, formulários, carrossel e estados nas rotas principais; corrigir barreiras encontradas e registrar critérios verificáveis.
  - **Ganho · Esforço · Risco:** Mais pessoas conseguem usar o catálogo e contatar a empresa · M · Pode exigir ajustes visuais e validação manual além de ferramentas automáticas.
  - **Fonte:** [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

- [ ] **M-002 · Medir e otimizar Core Web Vitals** — P2 · M · Performance
  - **Situação atual (evidência):** A home carrega um carrossel com imagens e os produtos usam imagens remotas; não há medição Lighthouse ou dados de Core Web Vitals no repositório.
  - **Proposta:** Medir LCP, CLS e INP nas rotas principais em mobile e desktop; otimizar apenas os recursos identificados pela medição e verificar novamente após inserir as imagens oficiais.
  - **Ganho · Esforço · Risco:** Menor tempo de carregamento e melhor experiência em conexões móveis · M · Compressão excessiva pode degradar imagens técnicas; comparar qualidade antes/depois.
  - **Fonte:** [Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images) · [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)

- [ ] **M-003 · Automatizar jornadas críticas do catálogo** — P2 · M · Qualidade
  - **Situação atual (evidência):** `package.json` oferece lint e build, mas não define script de testes; não foram encontrados arquivos de teste.
  - **Proposta:** Cobrir com testes de navegador a pesquisa, filtros, paginação, detalhes de produto, contato e estados de erro em viewport móvel e desktop.
  - **Ganho · Esforço · Risco:** Menos regressões nos fluxos de descoberta e contato · M · Configuração e execução em CI aumentam manutenção; manter os cenários focados em jornadas de negócio.
  - **Fonte:** [Next.js Testing Guide](https://nextjs.org/docs/app/guides/testing)

## 4. Dependências do backend
- [ ] **B-001 · Disponibilizar dados e imagens reais dos produtos** — Fornecer catálogo público com marcas, categorias, máquinas compatíveis, referências, imagens e especificações verificadas; mapear os campos disponíveis e ausentes. Corresponde ao item já listado na seção Backend · Bloqueia: T-005, T-006, T-008
- [ ] **B-002 · Definir recebimento de solicitações de contato** — Se o canal aprovado for formulário, receber os campos acordados, validar a solicitação e fornecer resposta de sucesso/falha sem expor dados internos; se não houver endpoint, confirmar o canal externo a ser usado pela UI. · Bloqueia: T-001, T-006

## 5. Concluídas
- [x] **Configuração técnica básica de SEO** — metadata global, `robots.ts` e `sitemap.ts` presentes; verificada em 2026-10-26. Metadados por rota permanecem em T-008.

## 6. Notas do dev
<área livre: o agente nunca altera esta seção>

### Backend:

- [ ] Adicionar imagens e dados dos produtos no banco de dados

### Agente

- [x] Adicionar ao agente a responsabilidade de implementar SEO nas páginas (Estudar antes como que funciona).
- [ ] Adicionar agente techlead para delegar tarefas
