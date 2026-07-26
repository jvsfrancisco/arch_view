<div align="center">

# Gestio · Gestão de Obras e Projetos

**Gestão de obras e vistorias técnicas para arquitetos.**
Centraliza execução, não conformidades, registro fotográfico e comunicação com o cliente — tudo o que hoje vive espalhado no WhatsApp.

</div>

---

## ✨ Visão geral

O Gestio resolve as dores mais comuns do acompanhamento de obra por arquitetos:
falta de controle sobre a execução, informação dispersa, dificuldade de registrar
não conformidades, ausência de histórico das visitas e clientes pedindo atualizações
constantes.

Esta é uma **aplicação SPA (React + Vite + TypeScript)** com um design system próprio,
cobrindo o fluxo completo do produto com dados de demonstração.

## 🧭 Módulos implementados

| Módulo | Descrição |
| --- | --- |
| **Dashboard** | Indicadores (obras, pendências, prazos), gráficos de resolução e cards de última/próxima vistoria |
| **Projetos** | Cadastro de obras com dados básicos, equipe, tipo e progresso; filtros e busca |
| **Detalhe do Projeto** | Visão geral, **Timeline** (feed estilo Instagram), equipe e **Projeto × Executado** |
| **Vistorias** | Criação de vistoria + histórico. O coração do sistema |
| **Detalhe da Vistoria** | **Checklist interativo** por etapa, **marcação sobre foto**, **diário de obra automático** |
| **Registro Fotográfico** | Grid com localização/data/responsável/comentário, lightbox e **análise da Genie** |
| **Pendências** | Quadro **Kanban** (Trello) com 5 status e **drag-and-drop** |
| **Cronograma** | **Gantt simplificado** com percentual de execução e marcador "hoje" |
| **Relatórios** | Geração de PDF (semanal/mensal/final) com preview, letterhead e **assinatura digital** |
| **Área do Cliente** | Portal simplificado: cronograma, fotos, avanço e relatórios — sem controles internos |

A IA do produto se chama **Genie** e aparece em dois pontos da interface: análise de fotos
(falhas, acabamentos incompletos, inconsistências) e geração de relatório técnico a partir
das notas da vistoria.

## 🎨 Design System

Sistema próprio, inspirado em Fieldwire, PlanRadar, ArchiSnapper, ClickUp, Monday e Notion,
mas com identidade nova e moderna:

- **Paleta**: neutros arquitetônicos (`ink`), primária *blueprint* (azul) e acento *clay* (terracota)
- **Tema claro/escuro** com variáveis CSS e persistência
- Tipografia Inter + JetBrains Mono, cantos suaves, sombras em camadas, textura de malha "blueprint"
- Componentes reutilizáveis: `Avatar`, `AvatarStack`, `Badge`, `Progress`, `Ring`, `Card`
- Micro-interações: animações de entrada escalonadas, hover lift, gráficos animados

## 🚀 Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento (Vite)
npm run build    # typecheck + build de produção
npm run preview  # servir o build
```

## 🛠️ Stack

React 18 · Vite 6 · TypeScript · Tailwind CSS 3 · React Router · Recharts · lucide-react

## 📂 Estrutura

```
src/
  components/   # Layout (sidebar/topbar) e UI compartilhada
  data/         # tipos e dados de demonstração (mock)
  lib/          # design tokens, helpers e tema
  pages/        # uma página por módulo
```

## 🗺️ Roadmap (Versão 2.0)

Integração ArchiCAD / Revit / Twinmotion · QR Code por ambiente · modelo BIM navegável ·
Realidade Aumentada · medição por foto com IA · controle financeiro · aprovação de materiais.
