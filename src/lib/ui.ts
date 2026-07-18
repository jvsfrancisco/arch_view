import type { IssueStatus, IssuePriority, ProjectType, InspectionStatus } from '@/data/types'

export const issueStatusMeta: Record<
  IssueStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  aberta: { label: 'Aberta', color: '#505d72', bg: 'rgba(101,116,139,0.12)', dot: '#65748b' },
  execucao: { label: 'Em execução', color: '#1f45eb', bg: 'rgba(53,99,246,0.12)', dot: '#3563f6' },
  fornecedor: { label: 'Aguardando fornecedor', color: '#a93520', bg: 'rgba(220,93,51,0.12)', dot: '#dc5d33' },
  revisao: { label: 'Revisão', color: '#a06a00', bg: 'rgba(224,164,17,0.15)', dot: '#e0a411' },
  concluida: { label: 'Concluída', color: '#2f7a52', bg: 'rgba(63,157,107,0.14)', dot: '#3f9d6b' },
}

export const priorityMeta: Record<IssuePriority, { label: string; color: string; bg: string }> = {
  baixa: { label: 'Baixa', color: '#65748b', bg: 'rgba(101,116,139,0.12)' },
  media: { label: 'Média', color: '#a06a00', bg: 'rgba(224,164,17,0.15)' },
  alta: { label: 'Alta', color: '#a93520', bg: 'rgba(220,93,51,0.14)' },
  critica: { label: 'Crítica', color: '#e0446b', bg: 'rgba(224,68,107,0.14)' },
}

export const projectTypeMeta: Record<ProjectType, { hue: number; icon: string }> = {
  Residencial: { hue: 210, icon: 'home' },
  Comercial: { hue: 24, icon: 'store' },
  Corporativo: { hue: 260, icon: 'building' },
  Interiores: { hue: 160, icon: 'sofa' },
}

export const inspectionStatusMeta: Record<InspectionStatus, { label: string; color: string; bg: string }> = {
  rascunho: { label: 'Rascunho', color: '#65748b', bg: 'rgba(101,116,139,0.12)' },
  concluida: { label: 'Concluída', color: '#1f45eb', bg: 'rgba(53,99,246,0.12)' },
  assinada: { label: 'Assinada', color: '#2f7a52', bg: 'rgba(63,157,107,0.14)' },
}

// Deterministic gradient cover from a seed
export function coverGradient(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360
  const h2 = (h + 40) % 360
  return `linear-gradient(135deg, hsl(${h} 62% 52%), hsl(${h2} 58% 40%))`
}

export function photoGradient(hue: number): string {
  return `linear-gradient(150deg, hsl(${hue} 45% 62%), hsl(${(hue + 30) % 360} 40% 38%))`
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export function formatDateLong(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function daysUntil(iso: string): number {
  const d = new Date(iso + 'T00:00:00').getTime()
  const now = new Date('2026-07-17T00:00:00').getTime()
  return Math.round((d - now) / 86400000)
}
