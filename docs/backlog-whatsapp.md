# Backlog — grupo WhatsApp "App. Gestão de obras"

> Fonte: grupo WhatsApp "App. Gestão de obras" (18/07 a 22/07/2026), extraído via MCP whatsapp.
> Todas as 25 mensagens de áudio do grupo foram baixadas (via MCP, após correção de bug —
> ver nota técnica no fim) e transcritas com faster-whisper (modelo medium, PT-BR).
> Cobertura completa: 100% das mensagens de texto + áudio do grupo.

## 1. Projeto — aba Cliente `BL-01`

- **Item:** Tirar "Cliente" da aba Equipes e criar aba própria de Cliente dentro do projeto.
- **Por quê:** Comum entre designers de interiores fazer briefing com cliente e coletar
  bastante informação (preferências etc.) — precisa ficar de fácil acesso, separado da equipe.
- **Status (contexto):** Novo, a validar.
- **Status:** Concluído
- Origem: mensagem de texto, 2026-07-18 11:32:51.

## 2. Projeto — aba Mídia `BL-02`

- **Item:** Criar aba de Mídia dentro do projeto com no mínimo 3 divisões: (1) fotos/vídeos
  de antes do projeto, (2) relatórios fotográficos, (3) fotos/vídeos do projeto concluído.
- **Por quê:** Relatório fotográfico como aba própria no menu dá acesso rápido a todas as
  obras de uma vez, mas também precisa ser acessível individualmente dentro de cada projeto.
- **Discussão complementar (11:50–11:59):** debate sobre ter também um "overview" geral de
  todas as fotos (não só as de vistoria), mesmo que redundante com as fotos que já aparecem
  dentro de cada vistoria — comparação usada: como a galeria de fotos do WhatsApp, que mostra
  fotos tanto dentro de cada conversa quanto agrupadas numa pasta geral. Estrutura sugerida:
  sistema de 3 pastas (antes / durante / depois), sendo a pasta "depois" fixa (não se mexe
  mais) — útil também pra funcionalidade paga futura de gerar post de Instagram antes/depois.
- **Status (contexto):** Novo, a validar (ideia já validada positivamente na própria conversa).
- **Status:** Concluído
- Origem: texto 2026-07-18 11:32:51 + áudios 11:50:04, 11:51:01, 11:51:36, 11:52:56, 11:57:44, 11:59:10.

## 3. Cronograma — visão geral `BL-03`

- **Item:** Além do cronograma filtrado por projeto, adicionar um cronograma geral
  (todas as obras juntas).
- **Por quê:** Facilita comparar cronograma entre obras.
- **Status (contexto):** Novo, a validar.
- **Status:** Concluído
- Origem: mensagem de texto, 2026-07-18 11:32:51.

## 4. Cronograma — cores por etapa `BL-04`

- **Item:** No cronograma geral, filtro pra marcar cada linha do tempo individualmente
  com cor de cada etapa do projeto.
- **Por quê:** Gestor de obra costuma tentar alinhar tarefas (ex: retirada de entulho) entre
  mais de uma obra ao mesmo tempo, pra economizar na caçamba — precisa enxergar etapas
  coloridas lado a lado pra achar essas janelas de sobreposição.
- **Status (contexto):** Novo, a validar.
- **Status:** Concluído
- Origem: mensagem de texto, 2026-07-18 11:32:51.

## 5. Menu inicial — botão "Novo" `BL-05`

- **Item:** Substituir botão "Nova vistoria" por botão genérico "Novo", que abre opções:
  novo projeto cadastrado, novo relatório fotográfico, ou nova vistoria.
- **Por quê:** Mais intuitivo que ter botões separados por tipo de ação.
- **Contexto adicional (12:52):** o nome "vistoria" ficou associado ao botão porque a ideia
  original do app, no início da conversa por texto, parecia focada nisso — mas isso pode (e
  deve) mudar conforme o produto evolui. Decisão de processo: fazer a UI primeiro, só depois
  o back-end, pra não ficar retrabalhando enquanto a visão do produto ainda está mudando.
- **Status (contexto):** Novo, a validar.
- **Status:** Concluído
- Origem: texto 2026-07-18 11:32:51 + áudio 11:52:56.

## 6. UI — paleta de cores customizável `BL-06`

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
  - Gerar/ler paleta a partir de imagem (logo) ou sugerir automaticamente cores "combinando"
    exigiria IA de leitura de imagem — custo de processamento e possivelmente de token.
  - Gerar subtons por cálculo de diferença de cor a partir de 1 cor base (sem IA de imagem)
    seria mais barato/simples.
  - Preocupação de UX: se a pessoa escolhe tom por tom, algum elemento pode ficar sem
    destaque visual — risco de má experiência.
- **Status (contexto):** Em discussão, decisão explícita de **adiar** ("deixar em suspensão")
  e focar em prioridades atuais primeiro — mas o autor pontua que é um risco real de adoção
  (conhece gente que não usaria um app só por achar feio), então não descartar de vez.
- **Status:** Backlog
- Origem: áudios 16:05:17, 16:08:16, 16:08:40, 16:11:25, 16:12:04, 16:13:11, 16:13:26,
  16:14:04, 16:14:33, 16:15:05.

## 7. Nome do app `BL-07`

- **Item:** Sugestão de nome: **"Gestio: Gestão de Obras e Projetos"**. "Gestio" vem do
  latim clássico ("ação de administrar, gerenciar, conduzir um negócio"), raiz de "gestão".
- **Status (contexto):** Em discussão / brainstorm, não fechado.
- **Status:** A fazer
- Nota lateral: Julieny sugeriu chamar a IA do app de "Geni" (de "gestão > gerência > geni").
- Origem: mensagens de texto, 2026-07-18 13:23–13:30.

## 8. Levantamento técnico (planta) dentro do app `BL-08`

- **Item:** Na primeira vistoria de um projeto novo, o profissional normalmente desenha a
  planta do espaço à mão (caderno) e depois passa pra AutoCAD/SketchUp. Ideia: ter uma aba
  no app pra fazer esse levantamento técnico digitalmente, direto na primeira vistoria.
- **Escopo básico (viável, segundo o autor):** spline de retângulo pra marcar direção das
  paredes, controle mínimo de ângulo, sistema de cotas (medidas com 2 casas decimais),
  blocos de porta/janela, e o spline de retângulo poder ficar "pausado" (representar
  estrutura em balanço, ex: parede que não desce até o chão).
- **Escopo pago/avançado (mais complexo, comparável a app concorrente já existente no
  mercado):** blocos de mobiliário (bancada, máquina de lavar etc.), conversão do desenho
  2D pra um 3D básico pra mostrar ao cliente na hora, exportação pra SKP/OBJ pra abrir em
  software de 3D e usar como base pra renderização.
- **Dúvida em aberto levantada pelo autor:** não sabe se uma IA consegue gerar/editar
  arquivo SketchUp diretamente nem o custo de processamento/token disso — pediu avaliação
  de viabilidade técnica.
- **Decisão:** validar viabilidade do escopo básico primeiro; escopo avançado fica pra depois,
  sem travar o que já está em andamento.
- **Item relacionado (menor escopo, considerado inviável por ora):** dar acesso remoto da
  IA/sistema ao SketchUp do usuário pra automatizar essa parte — avaliado como caro e
  trabalhoso ("ia ser um trampo maneiro"), não vale a pena no momento. Também levantada a
  preocupação de app mobile/web rodando sem boa conexão de internet no canteiro de obra.
- **Status:** Backlog
- Origem: texto 2026-07-18 11:59:23 + 12:05:46 + áudios 12:02:39, 12:12:00, 12:42:18, 12:43:57, 12:44:14.

## 9. Escopo do produto — não travar só em arquitetura `BL-09`

- **Item:** Abranger o app pra além de arquitetura — incluir engenharia e outros profissionais
  envolvidos em obra, não só interiores.
- **Por quê:** Ambos concordam que não vale nichar demais; exemplo concreto citado: engenheiro
  que trabalha com o pai de um dos participantes poderia usar o app depois de pronto.
- **Status (contexto):** Alinhado entre os dois, sem trabalho técnico associado ainda (é
  direcionamento de produto, não uma tela/feature específica).
- **Status:** A fazer
- Origem: áudios 11:27:41 e 11:33:31.

## 10. Vistoria — gerar documento/relatório automático `BL-10`

- **Item:** A partir de uma vistoria feita no app, gerar automaticamente um documento/relatório
  contendo: fotos, marcações feitas durante a vistoria, e texto escrito pelo profissional.
- **Por quê:** Encadeamento natural do fluxo — vistoria já vira o relatório fotográfico sem
  trabalho manual extra de montagem.
- **Status (contexto):** Novo, considerado fazer sentido pelo segundo participante.
- **Status:** Concluído
- Origem: áudio 11:37:21.

## 11. Relatório fotográfico x menu de Vistoria — indecisão de organização `BL-11`

- **Item:** Dúvida (não resolvida) sobre onde o relatório fotográfico deveria morar: dentro do
  menu de Vistoria (já que o relatório é parte de uma vistoria) em vez de aba própria (como
  desenhado no item 2). Ainda ficaria a pergunta de como isso convive com o checklist de
  vistoria (seria o checklist mais pra quando o profissional está no local marcando itens?).
- **Por quê:** O próprio autor diz que ficou "maquinando" sem chegar a uma conclusão exata —
  foi um dos motivos do atraso pra mandar o feedback estruturado (item 1-5).
- **Status (contexto):** Questão em aberto, precisa de decisão antes de fechar a estrutura de
  menu definitiva dos itens 1 e 2.
- **Status:** Backlog
- Origem: áudio 11:36:37.

## Nota técnica — bugs encontrados e corrigidos no MCP whatsapp

Download de mídia via `mcp__whatsapp__download_media` falhava com erro 403 em toda tentativa.
Investigação encontrou **dois bugs distintos** no bridge Go (`whatsapp-bridge/main.go`,
projeto `lharries/whatsapp-mcp`), ambos referenciados na PR upstream #270 (aberta, não
mergeada):

1. **403 (bug corrigido localmente):** a função `extractDirectPathFromURL` descartava a
   query string (`?oh=...&oe=...`, hash de autorização assinado) da URL de mídia antes de
   montar a requisição final — a Meta responde 403 sem esses parâmetros. Fix aplicado:
   removida a linha que fazia esse strip (`whatsapp-bridge/main.go`, dentro de
   `extractDirectPathFromURL`). Confirmado funcionando após reiniciar a bridge.
2. **Colisão de nome de arquivo (contornado, não corrigido no código):** o nome do arquivo
   de mídia é gerado uma única vez, no momento em que a mensagem chega (`extractMediaInfo`),
   usando timestamp com resolução de segundo. Mensagens de áudio recebidas no mesmo segundo
   (comum em sincronização de histórico em lote) colidem no mesmo nome de arquivo. Como
   `downloadMedia` retorna o arquivo existente sem rebaixar se o path já existir em disco,
   baixar uma mensagem depois de outra com nome colidido devolve o conteúdo **errado** (da
   mensagem anterior). Contorno usado: apagar o arquivo em disco antes de cada download
   individual, forçando o download real a cada chamada — resolveu para as 25 mensagens deste
   grupo, mas não é um fix permanente (mensagens novas recebidas no mesmo segundo no futuro
   teriam o mesmo problema). Fix definitivo exigiria nomear o arquivo por ID da mensagem
   (ou hash) em vez de timestamp — não aplicado ainda no código.

## Fora de escopo por agora

- Nome final do app ("Gestio" x outras opções) — depende de decisão do usuário, não é item técnico de backlog.
- Migração deste arquivo pro Notion — combinado que fica pra depois.
