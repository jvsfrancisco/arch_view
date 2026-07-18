import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Ruler, AlertTriangle, Plus, Search, LayoutGrid, Rows3 } from 'lucide-react'
import { Card, AvatarStack, Progress, Badge } from '@/components/ui'
import { projects } from '@/data/mock'
import { coverGradient, projectTypeMeta, daysUntil, formatDate } from '@/lib/ui'
import type { ProjectStatus } from '@/data/types'
import clsx from 'clsx'

const filters: { key: ProjectStatus | 'todas'; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'em_andamento', label: 'Em andamento' },
  { key: 'concluida', label: 'Concluídas' },
  { key: 'pausada', label: 'Pausadas' },
]

export default function Projects() {
  const [filter, setFilter] = useState<ProjectStatus | 'todas'>('todas')
  const [q, setQ] = useState('')

  const list = projects.filter((p) => {
    if (filter !== 'todas' && p.status !== filter) return false
    if (q && !`${p.name} ${p.client} ${p.city}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projetos</h1>
          <p className="text-sm text-dim">{projects.length} obras cadastradas no escritório</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} /> Novo projeto
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border p-1" style={{ background: 'var(--surface)' }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={clsx(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                filter === f.key ? 'bg-blueprint-600 text-white shadow-soft' : 'text-dim hover:text-body',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar projeto…" className="input w-56 pl-9" />
        </div>
      </div>

      <div className="grid gap-4 stagger sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => {
          const d = daysUntil(p.deadline)
          return (
            <Link key={p.id} to={`/projetos/${p.id}`}>
              <Card className="group overflow-hidden" hover>
                <div className="relative h-32" style={{ background: coverGradient(p.cover) }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-lg bg-black/25 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">{p.type}</span>
                    {p.status === 'concluida' && (
                      <span className="rounded-lg bg-moss px-2.5 py-1 text-xs font-semibold text-white">Concluída</span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-4 text-right text-white">
                    <div className="text-2xl font-bold">{p.progress}%</div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold tracking-tight group-hover:text-blueprint-600 transition">{p.name}</h3>
                  <p className="mt-0.5 text-sm text-dim">{p.client}</p>

                  <div className="mt-3 space-y-1.5 text-sm text-dim">
                    <p className="flex items-center gap-1.5"><MapPin size={14} /> {p.address}</p>
                    <p className="flex items-center gap-1.5"><Ruler size={14} /> {p.area} m² · {p.city}</p>
                  </div>

                  <div className="mt-4">
                    <Progress value={p.progress} color={p.status === 'concluida' ? '#3f9d6b' : '#3563f6'} />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <AvatarStack people={p.team.map((t) => ({ initials: t.initials, color: t.avatarColor }))} max={3} />
                    <div className="flex items-center gap-2">
                      {p.criticalIssues > 0 && (
                        <Badge color="#e0446b" bg="rgba(224,68,107,0.14)">
                          <AlertTriangle size={12} /> {p.criticalIssues}
                        </Badge>
                      )}
                      {p.status === 'em_andamento' && (
                        <span className={clsx('text-xs font-semibold', d < 30 ? 'text-clay-600' : 'text-dim')}>
                          {d > 0 ? `${d}d p/ entrega` : 'Atrasada'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
