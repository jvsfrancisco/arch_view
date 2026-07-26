# Backlog do Gestio

> Origem: grupo WhatsApp "App. Gestão de obras" (18–25/07/2026), transcrito por completo
> (texto + 25 áudios). Itens entregues saem daqui — o histórico deles vive no git.
>
> Cada item tem um id `BL-##` estável e uma linha `**Status:**`
> (`Backlog` / `A fazer` / `Em andamento` / `Concluído`), editável pelo board local
> (`npm run kanban`).

## 6. UI — paleta de cores customizável `BL-06`

- **Tag:** ui
- **Item:** Permitir personalização visual por escritório/profissional: logo na dashboard,
  botões e layout seguindo uma paleta de cores (ex: 4 tons) escolhida pelo usuário. Preto/branco
  do modo claro/escuro e o vermelho de "pendências críticas" ficam fora da customização (mantêm
  significado fixo).
- **Abordagens discutidas, sem decisão fechada:**
  1. Usuário escolhe tom por tom manualmente (já pode ter a paleta do escritório pronta).
  2. Usuário escolhe 1 cor base e o sistema gera os subtons automaticamente (comparação com
     recurso que o Instagram já testou: 1 cor base gerando subtom nos posts) — ou oferecer
     paletas prontas (ex: 4 opções) pra escolher sem cálculo algum.
  3. **Gerar a paleta a partir da logo do usuário** (subiria a logo e o sistema escolheria
     uma paleta com base nela) — opção citada mas sem avaliação de viabilidade ainda.
- **Por quê:** Fator de adoção real — várias designers de interiores (público-alvo) rejeitam
  um app só por acharem feio ou fora do estilo próprio delas.
- **Custo/risco levantado:**
  - Gerar/ler paleta a partir de imagem (logo) exigiria IA de leitura de imagem — custo de
    processamento e possivelmente de token.
  - Gerar subtons por cálculo de diferença de cor a partir de 1 cor base (sem IA de imagem)
    seria mais barato/simples.
  - Preocupação de UX: se a pessoa escolhe tom por tom, algum elemento pode ficar sem
    destaque visual — risco de má experiência.
- **Depende de:** BL-13 — quanto mais neutra for a marca do produto, mais espaço a cor do
  escritório tem pra assumir a interface sem conflito.
- **Status:** Backlog
- Origem: áudios 16:05:17 a 16:15:05.

## 8. Levantamento técnico (planta) dentro do app `BL-08`

- **Tag:** tecnico
- **Item:** Na primeira vistoria de um projeto novo, o profissional normalmente desenha a
  planta do espaço à mão (caderno) e depois passa pra AutoCAD/SketchUp. Ideia: ter uma aba
  no app pra fazer esse levantamento técnico digitalmente, direto na primeira vistoria.
- **Escopo básico (viável, segundo o autor):** spline de retângulo pra marcar direção das
  paredes, controle mínimo de ângulo, sistema de cotas (medidas com 2 casas decimais),
  blocos de porta/janela, e o spline de retângulo poder ficar "pausado" (representar
  estrutura em balanço, ex: parede que não desce até o chão).
- **Escopo pago/avançado (comparável a app concorrente já existente no mercado):** blocos de
  mobiliário (bancada, máquina de lavar etc.), conversão do desenho 2D pra um 3D básico pra
  mostrar ao cliente na hora, exportação pra SKP/OBJ pra abrir em software de 3D e usar como
  base pra renderização.
- **Dúvida em aberto:** não se sabe se uma IA consegue gerar/editar arquivo SketchUp
  diretamente, nem o custo de processamento/token disso — pediu avaliação de viabilidade.
- **Decisão:** validar viabilidade do escopo básico primeiro; escopo avançado fica pra depois.
- **Descartado por ora:** dar acesso remoto da IA/sistema ao SketchUp do usuário — caro e
  trabalhoso ("ia ser um trampo maneiro"). Também levantada a preocupação de app mobile/web
  rodando sem boa conexão no canteiro de obra.
- **Status:** Backlog
- Origem: texto 11:59:23 + 12:05:46 + áudios 12:02:39 a 12:44:14.

## 11. Relatório fotográfico x menu de Vistoria — decisão pendente `BL-11`

- **Tag:** vistoria
- **Item:** Dúvida não resolvida sobre onde o relatório fotográfico deve morar: dentro do
  menu de Vistoria (já que o relatório é parte de uma vistoria) em vez da aba de Mídia do
  projeto. Fica também a pergunta de como isso convive com o checklist de vistoria (seria o
  checklist mais pra quando o profissional está no local marcando itens?).
- **Por quê:** O próprio autor ficou "maquinando" sem chegar a conclusão — foi um dos motivos
  do atraso pra mandar o feedback estruturado.
- **Impacto:** decisão trava a estrutura de menu definitiva; as abas Cliente e Mídia já
  entregues podem precisar de ajuste conforme o que for decidido.
- **Status:** Backlog
- Origem: áudio 11:36:37.

## 12. Portal do cliente com shell próprio `BL-12`

- **Tag:** portal
- **Item:** Hoje `src/main.tsx` renderiza `/cliente` dentro do mesmo `<Layout>` do app
  interno — o "Portal do Cliente" aparece com a sidebar completa (Dashboard, Pendências,
  Vistorias…). É uma tela de demonstração pro arquiteto, não um portal. Dar um shell próprio
  à rota: sem menu interno, com marca do escritório no topo e layout mobile-first.
- **Por quê:** O cliente não deve nem enxergar a existência dos controles internos. Além do
  risco de confusão, a UX do portal é outra — o cliente acompanha, não opera.
- **Decisão de arquitetura:** microfrontend foi considerado e **descartado** — resolve
  autonomia de times, não isolamento de dados, e o time são 2 pessoas. O isolamento real vem
  de autorização no backend, que ainda não existe. Manter na mesma SPA.
- **Status:** A fazer
- Origem: discussão de arquitetura, 26/07/2026.

## 13. Identidade visual — logo e paleta do Gestio `BL-13`

- **Tag:** marca
- **Item:** O logo em `src/components/Layout.tsx` ainda é o monograma "A" do ArchView (dois
  chevrons formando telhado). Com o nome fechado em Gestio, desenhar marca nova — e revisar
  a paleta junto, já que blueprint (`#3563f6`) + clay (`#dc5d33`) foram escolhidos para o
  nome antigo.
- **Aplicações a cobrir:** favicon 16px, sidebar 36px, hero; tema claro e escuro.
- **Relação com BL-06:** quanto mais neutra a marca, mais fácil deixar o app assumir a cor do
  escritório do cliente sem brigar com a identidade do produto.
- **Status:** A fazer
- Origem: discussão de marca, 26/07/2026.

## 14. Separar o build do portal do cliente `BL-14`

- **Tag:** portal
- **Item:** Transformar o portal num segundo entry point do Vite (`client.html` +
  `client.tsx`), com bundle próprio, compartilhando design system e tipos por import normal.
  O cliente deixa de baixar o código das telas internas.
- **Bloqueado por:** login/backend. Sem autenticação, separar o bundle é cosmético — a API
  ainda entregaria os mesmos dados. Fazer depois de BL-12.
- **Status:** Backlog
- Origem: discussão de arquitetura, 26/07/2026.

## Nota técnica — bugs corrigidos no MCP whatsapp

O download de mídia (`mcp__whatsapp__download_media`, projeto `lharries/whatsapp-mcp`)
falhava com 403 em toda tentativa. Dois bugs distintos no bridge Go, ambos citados na PR
upstream #270 (aberta, não mergeada):

1. **403 — corrigido localmente.** `extractDirectPathFromURL` descartava a query string
   (`?oh=…&oe=…`, hash de autorização assinado) da URL de mídia antes de montar a requisição;
   a Meta responde 403 sem esses parâmetros. Fix: remover a linha que fazia o strip.
2. **Colisão de nome de arquivo — contornado, não corrigido.** O nome é gerado uma vez, na
   chegada da mensagem, com timestamp de resolução de segundo. Mensagens recebidas no mesmo
   segundo colidem, e `downloadMedia` devolve o arquivo já em disco sem rebaixar — retornando
   conteúdo **errado**. Contorno: apagar o arquivo antes de cada download. Fix definitivo
   exigiria nomear por ID da mensagem.
