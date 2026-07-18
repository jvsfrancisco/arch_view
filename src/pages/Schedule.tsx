import { useState } from 'react'
import { CalendarRange } from 'lucide-react'
import { Card, Progress, Badge } from '@/components/ui'
import { projects } from '@/data/mock'
import clsx from 'clsx'

const months = ['Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov']

// Deterministic bar placement per stage index
const layout: Record<string, { start: number; span: number }> = {
  demolicao: { start: 0, span: 1 },
  alvenaria: { start: 1, span: 2 },
  eletrica: { start: 2, span: 2 },
  hidraulica: { start: 2, span: 2 },
  gesso: { start: 4, span: 2 },
  pintura: { start: 5, span: 2 },
  marcenaria: { start: 6, span: 2 },
  decoracao: { start: 7, span: 2 },
}

const stageColors: Record<string, string> = {
  demolicao: '#65748b',
  alvenaria: '#dc5d33',
  eletrica: '#e0a411',
  hidraulica: '#3563f6',
  gesso: '#8b5cf6',
  pintura: '#3f9d6b',
  marcenaria: '#a93520',
  decoracao: '#e0446b',
}

export default function Schedule() {
  const [projectId, setProjectId] = useState(projects[0].id)
  const project = projects.find((p) => p.id === projectId)!
  const nowIndex = 4.4 // meados de Julho

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cronograma</h1>
          <p className="text-sm text-dim">Gantt simplificado com percentual de execução</p>
        </div>
        <select className="input w-64" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Progresso geral', value: `${project.progress}%`, color: '#3563f6' },
          { label: 'Etapas concluídas', value: `${project.stages.filter((s) => s.progress === 100).length}/${project.stages.length}`, color: '#3f9d6b' },
          { label: 'Etapas em execução', value: project.stages.filter((s) => s.progress > 0 && s.progress < 100).length, color: '#e0a411' },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-dim">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <CalendarRange size={18} className="text-blueprint-600" />
          <h2 className="font-bold tracking-tight">Linha do tempo · {project.name}</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Month header */}
            <div className="mb-2 flex border-b pb-2 pl-40">
              {months.map((m) => (
                <div key={m} className="flex-1 text-center text-xs font-semibold text-dim">{m}</div>
              ))}
            </div>

            {/* Rows */}
            <div className="relative space-y-2.5">
              {/* Today marker */}
              <div
                className="pointer-events-none absolute bottom-0 top-0 z-10 w-px"
                style={{ left: `calc(10rem + ${(nowIndex / months.length) * 100}% - ${(nowIndex / months.length) * 10}rem)`, background: '#e0446b' }}
              >
                <span className="absolute -top-1 -translate-x-1/2 rounded bg-rose2 px-1.5 py-0.5 text-[9px] font-bold text-white">HOJE</span>
              </div>

              {project.stages.map((s) => {
                const l = layout[s.key]
                return (
                  <div key={s.key} className="flex items-center">
                    <div className="flex w-40 shrink-0 items-center gap-2 pr-3">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: stageColors[s.key] }} />
                      <span className="truncate text-sm font-medium">{s.label}</span>
                    </div>
                    <div className="relative flex-1">
                      <div className="h-8 rounded-lg" style={{ background: 'var(--surface-2)' }} />
                      <div
                        className="absolute top-0 flex h-8 items-center overflow-hidden rounded-lg px-2 text-xs font-semibold text-white"
                        style={{
                          left: `${(l.start / months.length) * 100}%`,
                          width: `${(l.span / months.length) * 100}%`,
                          background: `${stageColors[s.key]}30`,
                          border: `1px solid ${stageColors[s.key]}`,
                        }}
                      >
                        <div className="absolute inset-y-0 left-0 rounded-l-lg" style={{ width: `${s.progress}%`, background: stageColors[s.key] }} />
                        <span className="relative z-10" style={{ color: s.progress > 40 ? '#fff' : stageColors[s.key] }}>{s.progress}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
