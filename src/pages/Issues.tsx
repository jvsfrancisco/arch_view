import { useState } from 'react'
import { Plus, Camera, MessageCircle, Clock, MapPin, AlertTriangle } from 'lucide-react'
import { Avatar, Badge } from '@/components/ui'
import { issues as seedIssues, projects } from '@/data/mock'
import { issueStatusMeta, priorityMeta, daysUntil } from '@/lib/ui'
import type { Issue, IssueStatus } from '@/data/types'
import clsx from 'clsx'

const columns: IssueStatus[] = ['aberta', 'execucao', 'fornecedor', 'revisao', 'concluida']

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>(seedIssues)
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<IssueStatus | null>(null)

  const move = (id: string, status: IssueStatus) => {
    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pendências</h1>
          <p className="text-sm text-dim">Arraste os cartões entre as colunas · {issues.filter((i) => i.status !== 'concluida').length} abertas</p>
        </div>
        <button className="btn-primary"><Plus size={16} /> Nova pendência</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const meta = issueStatusMeta[col]
          const items = issues.filter((i) => i.status === col)
          return (
            <div
              key={col}
              onDragOver={(e) => {
                e.preventDefault()
                setOverCol(col)
              }}
              onDragLeave={() => setOverCol((c) => (c === col ? null : c))}
              onDrop={() => {
                if (dragId) move(dragId, col)
                setDragId(null)
                setOverCol(null)
              }}
              className={clsx(
                'flex w-[280px] shrink-0 flex-col rounded-2xl border p-3 transition',
                overCol === col ? 'border-blueprint-400' : '',
              )}
              style={{ background: overCol === col ? 'rgba(53,99,246,0.05)' : 'var(--surface-2)' }}
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.dot }} />
                  <span className="text-sm font-bold">{meta.label}</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: meta.bg, color: meta.color }}>
                  {items.length}
                </span>
              </div>

              <div className="flex-1 space-y-2.5">
                {items.map((i) => {
                  const project = projects.find((p) => p.id === i.projectId)
                  const d = daysUntil(i.dueDate)
                  return (
                    <div
                      key={i.id}
                      draggable
                      onDragStart={() => setDragId(i.id)}
                      onDragEnd={() => setDragId(null)}
                      className={clsx('card cursor-grab p-3.5 active:cursor-grabbing', dragId === i.id && 'opacity-50')}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <Badge color={priorityMeta[i.priority].color} bg={priorityMeta[i.priority].bg}>
                          {i.priority === 'critica' && <AlertTriangle size={11} />}
                          {priorityMeta[i.priority].label}
                        </Badge>
                        <span className="text-[10px] font-medium text-dim">#{i.id.toUpperCase()}</span>
                      </div>
                      <p className="text-sm font-semibold leading-snug">{i.title}</p>
                      <p className="mt-1 text-xs text-dim flex items-center gap-1"><MapPin size={11} /> {project?.name.split(' ').slice(-1)} · {i.location}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 text-xs text-dim">
                          <span className="flex items-center gap-1"><Camera size={12} /> {i.photos}</span>
                          <span className="flex items-center gap-1"><MessageCircle size={12} /> {i.comments}</span>
                          <span className={clsx('flex items-center gap-1', d < 2 && i.status !== 'concluida' && 'text-clay-600 font-semibold')}>
                            <Clock size={12} /> {d > 0 ? `${d}d` : d === 0 ? 'Hoje' : 'Atras.'}
                          </span>
                        </div>
                        <Avatar initials={i.assigneeInitials} color={i.assigneeColor} size={24} />
                      </div>
                    </div>
                  )
                })}

                <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2 text-xs font-medium text-dim transition hover:text-body hover:border-blueprint-300">
                  <Plus size={13} /> Adicionar
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
